export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.replace(/^(\.|\/)+/, '').replace(/^WEBSITE\//, '');
  const base = (import.meta.env.BASE_URL || '/').endsWith('/')
    ? (import.meta.env.BASE_URL || '/')
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${cleanPath}`;
};
