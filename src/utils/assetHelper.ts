export const getAssetUrl = (path: string): string => {
  if (!path) return '';

  // Google Drive link auto-converter for direct high-speed image streaming
  if (path.includes('drive.google.com') || path.includes('googleusercontent.com')) {
    const fileIdMatch = path.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || path.match(/id=([a-zA-Z0-9_-]+)/) || path.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://lh3.googleusercontent.com/d/${fileId}=s2400`;
    }
  }

  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.replace(/^(\.|\/)+/, '').replace(/^WEBSITE\//, '');
  const base = (import.meta.env.BASE_URL || '/').endsWith('/')
    ? (import.meta.env.BASE_URL || '/')
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${cleanPath}`;
};

export const getAssetPath = getAssetUrl;

/**
 * Global Edge CDN Image Optimizer
 * Accelerates large Cloudflare R2 images (e.g. 7.8MB raw JPGs) by converting them
 * to ~250KB WebP files cached directly at Cloudflare edge datacenters (Mumbai/Delhi).
 */
export const getOptimizedImageUrl = (
  path: string,
  width: number = 2048,
  quality: number = 82
): string => {
  if (!path) return '';

  const rawUrl = getAssetUrl(path);

  if (rawUrl.endsWith('.svg') || rawUrl.endsWith('.mp4') || rawUrl.startsWith('data:')) {
    return rawUrl;
  }

  if (rawUrl.includes('r2.dev') || rawUrl.includes('supabase.co/storage')) {
    return `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=${width}&q=${quality}&output=webp&we=1`;
  }

  return rawUrl;
};
