import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accountId = 'f72c4d9c7b4e0ebbf11439806bd043d2';
const bucketName = 'albums';
const accessKeyId = 'f7d9f1690df1f5ff33bca4335c7451af';
const secretAccessKey = '1f86767008a77e992650a9168a2430f7a8b1e4760932f0c8816eb9d744ac737f';
const publicDomain = 'https://pub-ab2255cdffb74b42b851c495d86cc164.r2.dev';

const portfolioDir = path.resolve(__dirname, '../public/video-portfolio');
const mappingFile = path.resolve(__dirname, 'r2-video-urls.json');

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  return kSigning;
}

function loadMapping() {
  if (fs.existsSync(mappingFile)) {
    try {
      return JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveMapping(mapping) {
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2), 'utf-8');
}

async function uploadSingleFile(filePath, objectKey) {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const encodedKey = objectKey.split('/').map(encodeURIComponent).join('/');
  const url = `https://${host}/${bucketName}/${encodedKey}`;

  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  console.log(`[UPLOADING] ${path.basename(filePath)} (${(fileSize / (1024 * 1024)).toFixed(1)} MB)...`);

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);
  const region = 'auto';
  const service = 's3';
  const contentSha256 = 'UNSIGNED-PAYLOAD';

  const method = 'PUT';
  const canonicalUri = `/${bucketName}/${encodedKey}`;
  const canonicalHeaders =
    `content-length:${fileSize}\n` +
    `content-type:video/mp4\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${contentSha256}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = 'content-length;content-type;host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest =
    `${method}\n` +
    `${canonicalUri}\n\n` +
    `${canonicalHeaders}\n` +
    `${signedHeaders}\n` +
    `${contentSha256}`;

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const canonicalRequestHash = crypto.createHash('sha256').update(canonicalRequest).digest('hex');

  const stringToSign =
    `${algorithm}\n` +
    `${amzDate}\n` +
    `${credentialScope}\n` +
    `${canonicalRequestHash}`;

  const signingKey = getSignatureKey(secretAccessKey, dateStamp, region, service);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  const authorizationHeader =
    `${algorithm} ` +
    `Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, ` +
    `Signature=${signature}`;

  const readStream = fs.createReadStream(filePath);

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Host': host,
      'Content-Type': 'video/mp4',
      'Content-Length': String(fileSize),
      'x-amz-date': amzDate,
      'x-amz-content-sha256': contentSha256,
      'Authorization': authorizationHeader
    },
    body: readStream,
    // @ts-ignore
    duplex: 'half'
  });

  if (res.ok) {
    const publicUrl = `${publicDomain}/${encodedKey}`;
    console.log(`[DONE] ${path.basename(filePath)} -> ${publicUrl}`);
    return publicUrl;
  } else {
    const errText = await res.text();
    console.error(`[FAILED] ${path.basename(filePath)}: ${res.status} ${res.statusText}`, errText);
    return null;
  }
}

async function uploadAll() {
  const mapping = loadMapping();

  // Find all mp4 files
  const folders = fs.readdirSync(portfolioDir, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('.'));

  const queue = [];
  for (const folder of folders) {
    const folderPath = path.join(portfolioDir, folder.name);
    const files = fs.readdirSync(folderPath, { withFileTypes: true }).filter((f) => f.isFile() && f.name.endsWith('.mp4') && !f.name.startsWith('.'));

    for (const file of files) {
      const fullPath = path.join(folderPath, file.name);
      const relativeKey = `video-portfolio/${folder.name}/${file.name}`;
      const objectKey = `video-portfolio/${folder.name.replace(/[^a-zA-Z0-9_-]/g, '_')}/${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

      queue.push({
        fullPath,
        relativeKey,
        objectKey,
        name: file.name,
        size: fs.statSync(fullPath).size
      });
    }
  }

  // Sort queue by file size ascending (upload smaller reels & clips first so users get immediate playback!)
  queue.sort((a, b) => a.size - b.size);

  console.log(`Found ${queue.length} video files to upload. Starting uploads (smallest first)...`);

  let successCount = 0;
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    if (mapping[item.relativeKey]) {
      console.log(`[SKIP ${i + 1}/${queue.length}] Already uploaded: ${item.name}`);
      successCount++;
      continue;
    }

    console.log(`[PROGRESS ${i + 1}/${queue.length}] Uploading ${item.name}...`);
    try {
      const publicUrl = await uploadSingleFile(item.fullPath, item.objectKey);
      if (publicUrl) {
        mapping[item.relativeKey] = publicUrl;
        saveMapping(mapping);
        successCount++;
      }
    } catch (err) {
      console.error(`Error uploading ${item.name}:`, err);
    }
  }

  console.log(`\n========================================`);
  console.log(`Upload process finished! Successfully uploaded: ${successCount}/${queue.length}`);
  console.log(`========================================\n`);
}

uploadAll();
