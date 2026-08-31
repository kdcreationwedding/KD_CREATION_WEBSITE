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
