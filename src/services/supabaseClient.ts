import { createClient } from '@supabase/supabase-js';

// Read Supabase environment variables or default configured Supabase URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || (typeof window !== 'undefined' ? (window as any).SUPABASE_URL : '') || 'https://qrljgqlisbfchspwgiwe.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' ? (window as any).SUPABASE_ANON_KEY : '') || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'YOUR_SUPABASE_URL');
};

export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Helper: Upload photo file to Supabase Storage Bucket ('album-photos')
export const uploadPhotoToSupabase = async (file: File): Promise<string | null> => {
  if (!supabase) return null;
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `photobooks/${fileName}`;

    const { error } = await supabase.storage
      .from('album-photos')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (error) {
      console.warn('Supabase storage upload error:', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('album-photos')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.warn('Failed to upload photo to Supabase storage:', err);
    return null;
  }
};
