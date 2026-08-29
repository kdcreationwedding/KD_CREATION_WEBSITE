import { DigitalAlbum } from '../types/album';
import { apiClient } from './apiClient';
import { idbStore } from './idbStore';

const STORAGE_KEY = 'kd_digital_albums_v6';

// Real sample photobooks dataset for 1-click restore and default mobile scan fallback
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

// Helper to encode/decode album data into portable URL string for 100% mobile scanner guarantees
export const encodeAlbumToUrl = (album: DigitalAlbum): string => {
  try {
    const mini = {
      i: album.id,
      s: album.slug,
      c: album.couple,
      t: album.title || `${album.couple} Wedding Photobook`,
      st: album.subtitle || '',
      d: album.date || '2026',
      l: album.location || 'Ahmedabad',
      ci: album.coverImage,
      p: album.pages || []
    };
    return btoa(encodeURIComponent(JSON.stringify(mini)));
  } catch (e) {
    return '';
  }
};

export const decodeAlbumFromUrl = (encoded: string): DigitalAlbum | null => {
  try {
    const jsonStr = decodeURIComponent(atob(encoded));
    const mini = JSON.parse(jsonStr);
    return {
      id: mini.i || `album-${Date.now()}`,
      slug: mini.s || 'wedding',
      couple: mini.c || 'Happy Couple',
      title: mini.t || 'Wedding Photobook',
      subtitle: mini.st || '',
      date: mini.d || '2026',
      location: mini.l || 'Ahmedabad',
      coverImage: mini.ci || 'assets/yash-kavya-outer-cover.jpg',
      description: 'Digital Wedding Photobook by KD Creation',
      pages: mini.p || [],
      isPublished: true,
      isPrivate: false,
      watermarkEnabled: true,
      downloadAllowed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (e) {
    return null;
  }
};

let inMemoryAlbums: DigitalAlbum[] | null = null;

// Background hydration from IndexedDB and API server
if (typeof window !== 'undefined') {
  idbStore.getAlbums().then((idbAlbums) => {
    if (idbAlbums && idbAlbums.length > 0) {
      inMemoryAlbums = idbAlbums;
    }
  });

  apiClient.getAlbums().then((serverAlbums) => {
    if (serverAlbums && Array.isArray(serverAlbums) && serverAlbums.length > 0) {
      inMemoryAlbums = serverAlbums;
      idbStore.saveAlbums(serverAlbums);
    }
  });
}

export const albumService = {
  // Retrieve all albums from memory, localStorage or IndexedDB
  getAlbums: (): DigitalAlbum[] => {
    if (inMemoryAlbums !== null) {
      return inMemoryAlbums;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryAlbums = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read digital albums from localStorage', e);
    }
    inMemoryAlbums = [...DEMO_ALBUMS];
    return DEMO_ALBUMS;
  },

  // Get single album by slug or ID with DEMO_ALBUMS fallback so QR links never fail
  getAlbumBySlug: (slugOrId: string): DigitalAlbum | undefined => {
    const clean = slugOrId.replace(/^#?album-/, '').toLowerCase().trim();
    const albums = albumService.getAlbums();
    let found = albums.find(
      (a) => a.slug.toLowerCase().trim() === clean || a.id.toLowerCase().trim() === clean || a.id.toLowerCase().trim() === `album-${clean}`
    );
    if (!found) {
      found = DEMO_ALBUMS.find(
        (a) => a.slug.toLowerCase().trim() === clean || a.id.toLowerCase().trim() === clean || a.id.toLowerCase().trim() === `album-${clean}`
      );
    }
    return found;
  },

  // Save or update an album with IndexedDB & Node.js Express server sync
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

    // 1. Save to IndexedDB (Multi-GB unlimited persistent storage)
    idbStore.saveAlbums(newAlbums);

    // 2. Save to localStorage (if small enough)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlbums));
    } catch (e) {
      console.warn('LocalStorage quota limit reached, persisted in IndexedDB & runtime memory', e);
    }

    // 3. Sync to Node.js Backend API Server
    apiClient.saveAlbum(updatedAlbum).catch((err) => {
      console.warn('Server sync error', err);
    });

    return updatedAlbum;
  },

  // Restore Demo Photobooks
  restoreDemoAlbums: (): DigitalAlbum[] => {
    inMemoryAlbums = [...DEMO_ALBUMS];
    idbStore.saveAlbums(DEMO_ALBUMS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ALBUMS));
    } catch (e) {
      console.warn('Could not persist demo albums', e);
    }
    return DEMO_ALBUMS;
  },

  // Delete an album with IndexedDB & server sync
  deleteAlbum: (id: string): void => {
    const albums = albumService.getAlbums();
    const newAlbums = albums.filter((a) => a.id !== id);
    inMemoryAlbums = newAlbums;
    idbStore.saveAlbums(newAlbums);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlbums));
    } catch (e) {
      console.warn('Could not delete digital album', e);
    }
    apiClient.deleteAlbum(id).catch(() => {});
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

  // Generate full shareable URL with portable ?d= data encoding for 100% mobile scanner compatibility
  getShareableUrl: (album: DigitalAlbum | string): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.kdcreations.in';
    
    if (typeof album === 'string') {
      const cleanSlug = album.toLowerCase().trim().replace(/^#?album-/, '');
      const found = albumService.getAlbumBySlug(cleanSlug);
      if (found) {
        return albumService.getShareableUrl(found);
      }
      return `${origin}/?album=${cleanSlug}#album-${cleanSlug}`;
    }

    const cleanSlug = album.slug.toLowerCase().trim().replace(/^#?album-/, '');
    const isDemo = DEMO_ALBUMS.some((a) => a.slug === cleanSlug || a.id === album.id);
    if (isDemo) {
      return `${origin}/?album=${cleanSlug}#album-${cleanSlug}`;
    }

    // Attach portable encoded payload for custom albums so scanning on ANY mobile phone works 100%
    const encoded = encodeAlbumToUrl(album);
    if (encoded && encoded.length < 1800) {
      return `${origin}/?album=${cleanSlug}&d=${encoded}#album-${cleanSlug}`;
    }

    return `${origin}/?album=${cleanSlug}#album-${cleanSlug}`;
  }
};
