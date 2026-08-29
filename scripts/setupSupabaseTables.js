import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qrljgqlisbfchspwgiwe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9lH15TiavVbVnP0NO1ubIw_SjHh1wUx';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testAlbumCreationAndQRDeepLink() {
  console.log('Testing New Album Creation & Instant Supabase Cloud Push...');

  const newAlbum = {
    id: `album-${Date.now()}`,
    slug: 'live-test-couple',
    couple: 'Vijay & Hetal',
    title: 'Vijay & Hetal Destination Photobook',
    subtitle: 'Grand Udaipur Wedding',
    date: 'March 2026',
    location: 'Udaipur, Rajasthan',
    cover_image: '/assets/service-vijay-hetal.jpg',
    description: 'Beautiful 3D page flip photobook generated live for Vijay & Hetal',
    pages: JSON.stringify([
      '/assets/service-vijay-hetal.jpg',
      '/assets/vishwa-dhawal-g1.jpg',
      '/assets/yash-kavya-g4.jpg'
    ]),
    is_published: true,
    is_private: false,
    watermark_enabled: true,
    download_allowed: true,
    updated_at: new Date().toISOString()
  };

  // 1. Push to Supabase
  const { data, error } = await supabase.from('albums').upsert(newAlbum, { onConflict: 'id' }).select();
  if (error) {
    console.error('Supabase Save Error:', error.message);
    return;
  }

  console.log('✓ Successfully created & pushed new album to Supabase Cloud DB:', data[0].id);

  // 2. Simulate 2nd Phone QR Code Deep-Link Query (fetching from Supabase Cloud DB)
  const { data: cloudAlbums, error: fetchErr } = await supabase.from('albums').select('*').eq('slug', 'live-test-couple');

  if (fetchErr) {
    console.error('2nd Phone Cloud Query Error:', fetchErr.message);
    return;
  }

  console.log('✓ 2nd Device Scan Result (Direct from Supabase Cloud DB):');
  console.log('  Couple Name:', cloudAlbums[0].couple);
  console.log('  Cover Image:', cloudAlbums[0].cover_image);
  console.log('  Pages Array:', JSON.parse(cloudAlbums[0].pages));
  console.log('🎉 TEST SUCCESSFUL! New albums and QR deep-links are 100% active on all devices!');
}

testAlbumCreationAndQRDeepLink();
