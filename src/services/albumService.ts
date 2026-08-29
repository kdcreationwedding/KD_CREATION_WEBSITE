import { DigitalAlbum } from '../types/album';

const STORAGE_KEY = 'kd_digital_albums_v4';

// Real sample photobooks dataset for 1-click restore
export const DEMO_ALBUMS: DigitalAlbum[] = [
  {
    id: 'album-yash-kavya',
    slug: 'yash-kavya',
    title: 'The Heritage Grandeur',
    couple: 'Yash & Kavya',
    subtitle: 'Royal Heritage Wedding Photobook',
    date: '2026',
    location: 'Ahmedabad, Gujarat',
    coverImage: 'assets/yash-kavya-outer-cover.jpg',
    description: 'An opulent celebration blending rich Gujarati heritage, royal decor, and timeless cinematic moments.',
    pages: [
      'assets/yash-kavya-modal-cover.jpg',
      'assets/YASH & KAVYA/Yash & kavya.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (2).jpg',
      'assets/yash-kavya-g1.jpg',
      'assets/yash-kavya-g2.jpg',
      'assets/yash-kavya-g4.jpg'
    ],
    isPublished: true,
    isPrivate: false,
    watermarkEnabled: true,
    downloadAllowed: false,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z'
  },
  {
    id: 'album-dhaval-sangeeta',
    slug: 'dhaval-sangeeta',
    title: 'Two Souls — A Journey of Love',
    couple: 'Dhaval & Sangeeta',
    subtitle: 'Pre-Wedding & Wedding Heritage Album',
    date: '2026',
    location: 'Ahmedabad, Gujarat',
    coverImage: 'assets/dhaval-sangeeta-outer-cover.jpg',
    description: 'A beautiful journey where two souls choose each other, captured with pure 4K cinematic connection.',
    pages: [
      'assets/dhaval-sangeeta-modal-cover.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 01.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 02.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 03.jpg',
      'assets/DHAVAL & SANGEETA/DS PRE W (2).jpg',
      'assets/DHAVAL & SANGEETA/DS WEDDING (1).jpg'
    ],
    isPublished: true,
    isPrivate: false,
    watermarkEnabled: true,
    downloadAllowed: false,
    createdAt: '2026-02-10T00:00:00.000Z',
    updatedAt: '2026-02-10T00:00:00.000Z'
  }
];

let inMemoryAlbums: DigitalAlbum[] | null = null;

export const albumService = {
  // Retrieve all albums from memory or localStorage
  getAlbums: (): DigitalAlbum[] => {
    if (inMemoryAlbums !== null) {
      return inMemoryAlbums;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          inMemoryAlbums = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read digital albums from localStorage', e);
    }
    inMemoryAlbums = [];
    return [];
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

    inMemoryAlbums = newAlbums;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlbums));
    } catch (e) {
      console.warn('LocalStorage quota limit reached, persisted in runtime memory', e);
    }

    return updatedAlbum;
  },

  // Restore Demo Photobooks
  restoreDemoAlbums: (): DigitalAlbum[] => {
    inMemoryAlbums = [...DEMO_ALBUMS];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ALBUMS));
    } catch (e) {
      console.warn('Could not persist demo albums', e);
    }
    return DEMO_ALBUMS;
  },

  // Delete an album
  deleteAlbum: (id: string): void => {
    const albums = albumService.getAlbums();
    const newAlbums = albums.filter((a) => a.id !== id);
    inMemoryAlbums = newAlbums;
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
