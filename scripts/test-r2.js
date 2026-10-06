import crypto from 'crypto';
import fs from 'fs';

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

async function testUpload() {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const objectKey = 'test-video-ping.txt';
  const url = `https://${host}/${bucketName}/${objectKey}`;

  const body = Buffer.from('hello from r2 ping test');
  const contentSha256 = crypto.createHash('sha256').update(body).digest('hex');

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);
  const region = 'auto';
  const service = 's3';

  const method = 'PUT';
  const canonicalUri = `/${bucketName}/${objectKey}`;
  const canonicalHeaders =
    `content-type:text/plain\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${contentSha256}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

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

  console.log('Sending test PUT to Cloudflare R2...');
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Host': host,
      'Content-Type': 'text/plain',
      'x-amz-date': amzDate,
      'x-amz-content-sha256': contentSha256,
      'Authorization': authorizationHeader
    },
    body
  });

  console.log('R2 status:', res.status, res.statusText);
  if (res.ok) {
    const publicUrl = `${publicDomain}/${objectKey}`;
    console.log('Test successful! Public URL:', publicUrl);
    const ping = await fetch(publicUrl);
    console.log('Public fetch status:', ping.status);
  } else {
    const text = await res.text();
    console.log('R2 error body:', text);
  }
}

testUpload();
