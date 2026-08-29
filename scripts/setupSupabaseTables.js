import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qrljgqlisbfchspwgiwe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9lH15TiavVbVnP0NO1ubIw_SjHh1wUx';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const defaultAlbums = [
  {
    id: 'ALBUM-001',
    slug: 'vishwa-dhawal',
    couple: 'Vishwa & Dhawal',
    title: 'Vishwa & Dhawal Royal Wedding Album',
    subtitle: 'A Regal Celebration of Love',
    date: 'February 2026',
    location: 'Umaid Bhawan Palace, Jodhpur',
    cover_image: '/assets/vishwa-dhawal-outer-cover.jpg',
    description: 'Exclusive 3D Digital Photobook experience for Vishwa & Dhawal',
    pages: JSON.stringify([
      '/assets/vishwa-dhawal-g1.jpg',
      '/assets/vishwa-dhawal-g2.jpg',
      '/assets/vishwa-dhawal-g3.jpg',
      '/assets/vishwa-dhawal-modal-cover.jpg'
    ]),
    is_published: true,
    is_private: false,
    watermark_enabled: true,
    download_allowed: true,
    updated_at: new Date().toISOString()
  },
  {
    id: 'ALBUM-002',
    slug: 'yash-kavya',
    couple: 'Yash & Kavya',
    title: 'Yash & Kavya Cinematic Storybook',
    subtitle: 'Moments Sealed in Time',
    date: 'January 2026',
    location: 'Leela Palace, Udaipur',
    cover_image: '/assets/yash-kavya-outer-cover.jpg',
    description: 'A magical celebration captured in stunning 3D page flip experience',
    pages: JSON.stringify([
      '/assets/YASH & KAVYA/Yash & kavya.jpg',
      '/assets/YASH & KAVYA/Yash & kavya - Copy.jpg',
      '/assets/YASH & KAVYA/Yash & kavya - Copy - Copy.jpg',
      '/assets/yash-kavya-g4.jpg'
    ]),
    is_published: true,
    is_private: false,
    watermark_enabled: true,
    download_allowed: true,
    updated_at: new Date().toISOString()
  },
  {
    id: 'ALBUM-003',
    slug: 'dhaval-sangeeta',
    couple: 'Dhaval & Sangeeta',
    title: 'Dhaval & Sangeeta Traditional Celebration',
    subtitle: 'Heritage & Elegance',
    date: 'December 2025',
    location: 'Ahmedabad Grand Hall',
    cover_image: '/assets/dhaval-sangeeta-outer-cover.jpg',
    description: 'Vibrant wedding memories beautifully presented in digital photobook',
    pages: JSON.stringify([
      '/assets/dhaval-sangeeta-g1.jpg',
      '/assets/dhaval-sangeeta-g2.jpg',
      '/assets/dhaval-sangeeta-g3.jpg',
      '/assets/dhaval-sangeeta-g4.jpg'
    ]),
    is_published: true,
    is_private: false,
    watermark_enabled: true,
    download_allowed: true,
    updated_at: new Date().toISOString()
  },
  {
    id: 'ALBUM-004',
    slug: 'kaushik-anjali',
    couple: 'Kaushik & Anjali',
    title: 'Kaushik & Anjali Destination Wedding',
    subtitle: 'Sunset Romance',
    date: 'November 2025',
    location: 'Goa Beach Resort',
    cover_image: '/assets/kaushik-anjali-outer-cover.jpg',
    description: 'Breathtaking beach wedding album with HD 3D page turning',
    pages: JSON.stringify([
      '/assets/kaushik & anjali/DSC01971.JPG',
      '/assets/kaushik & anjali/DSC01993.JPG',
      '/assets/kaushik & anjali/DSC02026.JPG',
      '/assets/kaushik & anjali/DSC02030.JPG'
    ]),
    is_published: true,
    is_private: false,
    watermark_enabled: true,
    download_allowed: true,
    updated_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('Seeding default albums into Supabase Cloud Database...');
  for (const album of defaultAlbums) {
    const { data, error } = await supabase.from('albums').upsert(album, { onConflict: 'id' }).select();
    if (error) console.error(`Error inserting ${album.couple}:`, error.message);
    else console.log(`✓ Inserted ${album.couple} into Supabase!`);
  }
}

seed();
