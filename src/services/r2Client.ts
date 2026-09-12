/**
 * Cloudflare R2 Storage Service for KD Creation Digital Photobooks
 * - Native S3-Compatible SigV4 REST uploader using Web Crypto API (zero heavy SDK dependencies)
 * - Zero Egress Fees, Lightning-fast Global CDN delivery
 */

export interface R2Config {
  accountId: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicDomain: string; // e.g., 'https://pub-xxxx.r2.dev' or 'https://albums.kdcreations.in'
}

const R2_CONFIG_KEY = 'kd_cloudflare_r2_config_v1';

// Default / initial environment fallback if provided in Vite .env
const DEFAULT_CONFIG: R2Config = {
  accountId: import.meta.env.VITE_R2_ACCOUNT_ID || '',
  bucketName: import.meta.env.VITE_R2_BUCKET_NAME || 'albums',
  accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || '',
  secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || '',
  publicDomain: import.meta.env.VITE_R2_PUBLIC_DOMAIN || ''
};

export const r2Service = {
  // Get active R2 configuration from localStorage with .env fallback
  getConfig: (): R2Config => {
    try {
      const saved = localStorage.getItem(R2_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          accountId: parsed.accountId || DEFAULT_CONFIG.accountId,
          bucketName: parsed.bucketName || DEFAULT_CONFIG.bucketName,
          accessKeyId: parsed.accessKeyId || DEFAULT_CONFIG.accessKeyId,
          secretAccessKey: parsed.secretAccessKey || DEFAULT_CONFIG.secretAccessKey,
          publicDomain: parsed.publicDomain || DEFAULT_CONFIG.publicDomain
        };
      }
    } catch (e) {
      console.warn('Could not read R2 config from storage', e);
    }
    return { ...DEFAULT_CONFIG };
  },

  // Save updated R2 credentials into localStorage
  saveConfig: (config: R2Config): void => {
    try {
      localStorage.setItem(R2_CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Could not save R2 config', e);
    }
  },

  // Check if R2 is configured
  isConfigured: (): boolean => {
    const config = r2Service.getConfig();
    return Boolean(
      config.accountId &&
      config.bucketName &&
      config.accessKeyId &&
      config.secretAccessKey
    );
  },

  /**
   * Upload single photo to Cloudflare R2 bucket and return public CDN URL
   * @param file Original high-resolution photo file
   * @param albumSlug Folder name under bucket (e.g. 'yash-kavya')
   */
  uploadPhoto: async (file: File, albumSlug: string = 'general'): Promise<string | null> => {
    const config = r2Service.getConfig();
    if (!r2Service.isConfigured()) {
      console.warn('Cloudflare R2 is not configured. Please add R2 credentials in Admin Settings.');
      return null;
    }

    try {
      const cleanSlug = albumSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const objectKey = `albums/${cleanSlug}/${safeFileName}`;

      const host = `${config.accountId}.r2.cloudflarestorage.com`;
      const url = `https://${host}/${config.bucketName}/${objectKey}`;

      const now = new Date();
      const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
      const dateStamp = amzDate.substring(0, 8);
      const region = 'auto';
      const service = 's3';

      // Use UNSIGNED-PAYLOAD for browser file streaming without pre-buffering
      const contentSha256 = 'UNSIGNED-PAYLOAD';

      // 1. Create Canonical Request
      const method = 'PUT';
      const canonicalUri = `/${config.bucketName}/${encodeURI(objectKey)}`;
      const canonicalQuerystring = '';
      const canonicalHeaders =
        `content-type:${file.type || 'image/jpeg'}\n` +
        `host:${host}\n` +
        `x-amz-content-sha256:${contentSha256}\n` +
        `x-amz-date:${amzDate}\n`;
      const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

      const canonicalRequest =
        `${method}\n` +
        `${canonicalUri}\n` +
        `${canonicalQuerystring}\n` +
        `${canonicalHeaders}\n` +
        `${signedHeaders}\n` +
        `${contentSha256}`;

      // 2. Create String to Sign
      const algorithm = 'AWS4-HMAC-SHA256';
      const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
      const canonicalRequestHash = await sha256Hex(canonicalRequest);

      const stringToSign =
        `${algorithm}\n` +
        `${amzDate}\n` +
        `${credentialScope}\n` +
        `${canonicalRequestHash}`;

      // 3. Calculate Signature using Web Crypto API
      const signingKey = await getSignatureKey(config.secretAccessKey, dateStamp, region, service);
      const signature = await hmacSha256Hex(signingKey, stringToSign);

      // 4. Build Authorization Header
      const authorizationHeader =
        `${algorithm} ` +
        `Credential=${config.accessKeyId}/${credentialScope}, ` +
        `SignedHeaders=${signedHeaders}, ` +
        `Signature=${signature}`;

      // 5. Send Direct PUT Request to Cloudflare R2
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type || 'image/jpeg',
          'x-amz-date': amzDate,
          'x-amz-content-sha256': contentSha256,
          'Authorization': authorizationHeader
        },
        body: file
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`R2 Upload failed [${response.status}]:`, errorText);
        throw new Error(`R2 Upload HTTP ${response.status}: ${errorText}`);
      }

      // 6. Return Public CDN Delivery URL
      let publicBase = (config.publicDomain || '').trim().replace(/\/+$/, '');
      if (!publicBase) {
        publicBase = `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucketName}`;
      } else if (!publicBase.startsWith('http://') && !publicBase.startsWith('https://')) {
        publicBase = `https://${publicBase}`;
      }

      return `${publicBase}/${objectKey}`;
    } catch (err: any) {
      console.error('Failed to upload photo to Cloudflare R2:', err);
      return null;
    }
  },

  /**
   * Test connection to Cloudflare R2 bucket with current credentials
   */
  testConnection: async (): Promise<{ success: boolean; message: string }> => {
    const config = r2Service.getConfig();
    if (!r2Service.isConfigured()) {
      return {
        success: false,
        message: 'Please fill in Account ID, Bucket Name, Access Key ID, and Secret Access Key.'
      };
    }

    try {
      const testFile = new File(['KD Creation R2 Connection Test - ' + Date.now()], 'connection-test.txt', {
        type: 'text/plain'
      });
      const testUrl = await r2Service.uploadPhoto(testFile, 'system-test');

      if (testUrl) {
        return {
          success: true,
          message: `✓ Successfully connected to Cloudflare R2! Test URL: ${testUrl}`
        };
      } else {
        return {
          success: false,
          message: 'Upload test failed. Please verify Bucket Name and API Token permissions.'
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: `Connection error: ${err.message || 'Check credentials and CORS settings'}`
      };
    }
  }
};

// ================= Web Crypto API Helpers ================= //

async function sha256Hex(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return bufferToHex(hashBuffer);
}

async function hmacSha256(key: CryptoKey, data: string): Promise<ArrayBuffer> {
  const dataBuffer = new TextEncoder().encode(data);
  return await crypto.subtle.sign('HMAC', key, dataBuffer);
}

async function hmacSha256Hex(key: CryptoKey, data: string): Promise<string> {
  const sig = await hmacSha256(key, data);
  return bufferToHex(sig);
}

async function getSignatureKey(
  key: string,
  dateStamp: string,
  regionName: string,
  serviceName: string
): Promise<CryptoKey> {
  const kSecret = new TextEncoder().encode('AWS4' + key);

  const key1 = await crypto.subtle.importKey(
    'raw',
    kSecret,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const kDate = await hmacSha256(key1, dateStamp);

  const key2 = await crypto.subtle.importKey(
    'raw',
    kDate,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const kRegion = await hmacSha256(key2, regionName);

  const key3 = await crypto.subtle.importKey(
    'raw',
    kRegion,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const kService = await hmacSha256(key3, serviceName);

  const key4 = await crypto.subtle.importKey(
    'raw',
    kService,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const kSigning = await hmacSha256(key4, 'aws4_request');

  return await crypto.subtle.importKey(
    'raw',
    kSigning,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
