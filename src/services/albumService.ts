import { DigitalAlbum } from '../types/album';

const STORAGE_KEY = 'kd_digital_albums_v1';

// Seed dataset populated with real KD Creation wedding photobooks
const SEED_ALBUMS: DigitalAlbum[] = [
  {
    id: 'album-yash-kavya',
    slug: 'yash-kavya',
    title: 'The Heritage Grandeur',
    couple: 'Yash & Kavya',
    subtitle: 'Royal Heritage Wedding Photobook',
    date: '2026',
    location: 'Ahmedabad, Gujarat',
    coverImage: 'assets/yash-kavya-outer-cover.jpg',
    description: 'An opulent celebration blending rich Gujarati heritage, royal decor, and timeless cinematic moments captured with 4K anamorphic clarity.',
    pages: [
      'assets/yash-kavya-modal-cover.jpg',
      'assets/YASH & KAVYA/Yash & kavya.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (2).jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (2) - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (3).jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (3) - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (4).jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (4) - Copy.jpg',
      'assets/YASH & KAVYA/Yash & kavya - Copy - Copy (5) - Copy.jpg',
      'assets/yash-kavya-g1.jpg',
      'assets/yash-kavya-g2.jpg',
      'assets/yash-kavya-g4.jpg'
    ],
    isPublished: true,
    isPrivate: false,
    watermarkEnabled: true,
    downloadAllowed: false,
    seoTitle: 'Yash & Kavya Wedding Photobook | KD Creation Ahmedabad',
    seoDescription: 'View Yash & Kavya royal heritage wedding photobook captured by KD Creation in Ahmedabad, Gujarat.',
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
    description: 'A beautiful journey where two souls choose each other, captured with pure 4K cinematic connection and editorial black-and-white art.',
    pages: [
      'assets/dhaval-sangeeta-modal-cover.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANDEETA PRE - Copy (4).jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANDEETA PRE - Copy (5).jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 01.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 02.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 03.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 04.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 05.jpg',
      'assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 06.jpg',
      'assets/DHAVAL & SANGEETA/DS PRE W (2).jpg',
      'assets/DHAVAL & SANGEETA/DS PRE W (3).jpg',
      'assets/DHAVAL & SANGEETA/DS WEDDING (1).jpg',
      'assets/DHAVAL & SANGEETA/DS WEDDING (3).jpg',
      'assets/DHAVAL & SANGEETA/Dhaval & Sangita ......jpg',
      'assets/DHAVAL & SANGEETA/Dhaval & Sangita....jpg',
      'assets/DHAVAL & SANGEETA/KD_09678.jpg',
      'assets/DHAVAL & SANGEETA/KD_09784.jpg',
      'assets/DHAVAL & SANGEETA/KD_09786.jpg'
    ],
    isPublished: true,
    isPrivate: false,
    watermarkEnabled: true,
    downloadAllowed: false,
    seoTitle: 'Dhaval & Sangeeta Digital Wedding Album | KD Creation',
    seoDescription: 'Explore Dhaval & Sangeeta digital wedding and pre-wedding photobook captured by KD Creation.',
    createdAt: '2026-02-10T00:00:00.000Z',
    updatedAt: '2026-02-10T00:00:00.000Z'
  },
  {
    id: 'album-kaushik-anjali',
    slug: 'kaushik-anjali',
    title: 'Symphony of Grace',
    couple: 'Kaushik & Anjali',
    subtitle: 'Pre-Wedding Love Story Photobook',
    date: '2025',
    location: 'Ahmedabad, Gujarat',
    coverImage: 'assets/kaushik-anjali-outer-cover.jpg',
    description: 'A joyful celebration of hand-in-hand devotion, lush mint green ethnic elegance, and timeless romantic moments captured in fine-art 4K cinema.',
    pages: [
      'assets/kaushik-anjali-modal-cover.jpg',
      'assets/kaushik & anjali/DSC01971.JPG',
      'assets/kaushik & anjali/DSC01993.JPG',
      'assets/kaushik & anjali/DSC01997.JPG',
      'assets/kaushik & anjali/DSC02026.JPG',
      'assets/kaushik & anjali/DSC02030.JPG',
      'assets/kaushik & anjali/DSC02032.JPG',
      'assets/kaushik-anjali-g1.jpg',
      'assets/kaushik-anjali-g2.jpg',
      'assets/kaushik-anjali-g3.jpg',
      'assets/kaushik-anjali-g4.jpg'
    ],
    isPublished: true,
    isPrivate: false,
    watermarkEnabled: true,
    downloadAllowed: false,
    seoTitle: 'Kaushik & Anjali Pre-Wedding Album | KD Creation',
    seoDescription: 'View Kaushik & Anjali pre-wedding digital photobook captured by KD Creation in Ahmedabad.',
    createdAt: '2025-11-20T00:00:00.000Z',
    updatedAt: '2025-11-20T00:00:00.000Z'
  },
  {
    id: 'album-vishwa-dhawal',
    slug: 'vishwa-dhawal',
    title: 'Royal Gujarati Traditions',
    couple: 'Vishwa & Dhawal',
    subtitle: 'Mandap Rituals & Royal Reception',
    date: '2025',
    location: 'Gandhinagar, Gujarat',
    coverImage: 'assets/vishwa-dhawal-outer-cover.jpg',
    description: 'A vibrant celebration of sacred Gujarati wedding rituals, vibrant garba night dancing, and timeless mandap vows captured in high definition.',
    pages: [
      'assets/vishwa-dhawal-modal-cover.jpg',
      'assets/vishwa-dhawal-g1.jpg',
      'assets/vishwa-dhawal-g2.jpg',
      'assets/vishwa-dhawal-g3.jpg',
      'assets/service-prewedding-rakhi.jpg',
      'assets/service-vijay-hetal.jpg',
      'assets/service-couple-hands.jpg',
      'assets/service-bride-mirror.jpg'
    ],
    isPublished: true,
    isPrivate: true,
    password: 'KD2026ALBUM',
    watermarkEnabled: true,
    downloadAllowed: false,
    seoTitle: 'Vishwa & Dhawal Private Wedding Photobook | KD Creation',
    seoDescription: 'Private digital wedding photobook for Vishwa & Dhawal by KD Creation.',
    createdAt: '2025-12-05T00:00:00.000Z',
    updatedAt: '2025-12-05T00:00:00.000Z'
  }
];

export const albumService = {
  // Retrieve all albums (persisted or seed)
  getAlbums: (): DigitalAlbum[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read digital albums from localStorage', e);
    }
    // Initialize default seed dataset
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
