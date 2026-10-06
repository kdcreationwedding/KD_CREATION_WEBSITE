import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const accountId = 'f72c4d9c7b4e0ebbf11439806bd043d2';
const bucketName = 'albums';
const accessKeyId = 'f7d9f1690df1f5ff33bca4335c7451af';
const secretAccessKey = '1f86767008a77e992650a9168a2430f7a8b1e4760932f0c8816eb9d744ac737f';
const publicDomain = 'https://pub-ab2255cdffb74b42b851c495d86cc164.r2.dev';

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  return kSigning;
}

export async function uploadFileToR2(filePath, objectKey) {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const url = `https://${host}/${bucketName}/${encodeURI(objectKey)}`;

  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  console.log(`Starting upload: ${path.basename(filePath)} (${(fileSize / (1024 * 1024)).toFixed(1)} MB)...`);

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);
  const region = 'auto';
  const service = 's3';

  // For large files, use UNSIGNED-PAYLOAD so we don't have to buffer gigabytes into RAM for sha256
  const contentSha256 = 'UNSIGNED-PAYLOAD';

  const method = 'PUT';
  const canonicalUri = `/${bucketName}/${encodeURI(objectKey)}`;
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

  // Stream directly from disk
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
    const publicUrl = `${publicDomain}/${encodeURI(objectKey)}`;
    console.log(`✓ Uploaded successfully! Public URL: ${publicUrl}`);
    return publicUrl;
  } else {
    const errText = await res.text();
    console.error(`✗ Upload failed: ${res.status} ${res.statusText}`, errText);
    return null;
  }
}

// Test with Intro video
const testFile = path.resolve('public/video-portfolio/Reel/INTRO VIDEO.mp4');
if (fs.existsSync(testFile)) {
  uploadFileToR2(testFile, 'video-portfolio/Reel/INTRO_VIDEO.mp4')
    .then((url) => {
      console.log('Result:', url);
    })
    .catch((err) => console.error(err));
} else {
  console.log('Test file does not exist');
}
