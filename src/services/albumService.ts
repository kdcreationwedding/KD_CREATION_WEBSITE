import { DigitalAlbum } from '../types/album';

const STORAGE_KEY = 'kd_digital_albums_v3';

// Empty initial dataset - all albums managed dynamically via Admin Vault
const SEED_ALBUMS: DigitalAlbum[] = [];

export const albumService = {
  // Retrieve all albums (persisted or seed)
  getAlbums: (): DigitalAlbum[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read digital albums from localStorage', e);
    }
    // Initialize default seed dataset only on first visit
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ALBUMS));
    return SEED_ALBUMS;
  },

  // Get single album by slug or ID
  getAlbumBySlug: (slugOrId: string): DigitalAlbum | undefined => {
    const albums = albumService.getAlbums();
    return albums.find(
      (a) => a.slug.toLowerCase() === slugOrId.toLowerCase() || a.id === slugOrId
    );
  },

  // Save or update an album
  saveAlbum: (album: DigitalAlbum): DigitalAlbum => {
    const albums = albumService.getAlbums();
    const index = albums.findIndex((a) => a.id === album.id);
    const updatedAlbum = {
      ...album,
      updatedAt: new Date().toISOString()
    };

    let newAlbums: DigitalAlbum[];
    if (index >= 0) {
      newAlbums = [...albums];
      newAlbums[index] = updatedAlbum;
    } else {
      newAlbums = [updatedAlbum, ...albums];
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlbums));
    } catch (e) {
      console.warn('Could not save digital album to localStorage', e);
    }

    return updatedAlbum;
  },

  // Delete an album
  deleteAlbum: (id: string): void => {
    const albums = albumService.getAlbums();
    const newAlbums = albums.filter((a) => a.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlbums));
    } catch (e) {
      console.warn('Could not delete digital album', e);
    }
  },

  // Toggle published status
  togglePublish: (id: string): boolean => {
    const albums = albumService.getAlbums();
    const album = albums.find((a) => a.id === id);
    if (!album) return false;

    album.isPublished = !album.isPublished;
    albumService.saveAlbum(album);
    return album.isPublished;
  },

  // Generate full shareable URL
  getShareableUrl: (slug: string): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.kdcreations.in';
    return `${origin}/#album-${slug}`;
  }
};
