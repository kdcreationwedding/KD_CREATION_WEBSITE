import { supabase, isSupabaseConfigured, uploadPhotoToSupabase } from './supabaseClient';

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return '/api';
    }
  }
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();
const GITHUB_CLOUD_DB_URL = 'https://raw.githubusercontent.com/kdcreationwedding/KD_CREATION_WEBSITE/main/server/data/db.json';

export const apiClient = {
  // Check if Node.js server is online
  checkHealth: async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 1. Digital Albums - 24/7 Cloud Sync from Supabase + GitHub Cloud DB + Local Backend
  getAlbums: async () => {
    // 0. Try Supabase first if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('albums').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            couple: item.couple,
            subtitle: item.subtitle,
            date: item.date,
            location: item.location,
            coverImage: item.cover_image || item.coverImage,
            description: item.description,
            pages: typeof item.pages === 'string' ? JSON.parse(item.pages) : (item.pages || []),
            isPublished: item.is_published ?? item.isPublished ?? true,
            isPrivate: item.is_private ?? item.isPrivate ?? false,
            password: item.password || '',
            watermarkEnabled: item.watermark_enabled ?? item.watermarkEnabled ?? true,
            downloadAllowed: item.download_allowed ?? item.downloadAllowed ?? false,
            createdAt: item.created_at || item.createdAt,
            updatedAt: item.updated_at || item.updatedAt
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch albums error:', e);
      }
    }

    // 1. Try local Express backend proxy
    try {
      const res = await fetch(`${API_BASE_URL}/albums`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Local Express server offline, fetching from 24/7 Cloud Database...', e);
    }

    // 2. Fetch from 24/7 Public Cloud Database (GitHub Cloud DB)
    try {
      const cloudRes = await fetch(GITHUB_CLOUD_DB_URL);
      if (cloudRes.ok) {
        const cloudData = await cloudRes.json();
        if (cloudData && Array.isArray(cloudData.albums)) {
          return cloudData.albums;
        }
      }
    } catch (err) {
      console.warn('Could not fetch from 24/7 Cloud Database', err);
    }

    return null;
  },

  saveAlbum: async (album: any) => {
    // 0. Save to Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const payload = {
          id: album.id,
          slug: album.slug,
          title: album.title,
          couple: album.couple,
          subtitle: album.subtitle || '',
          date: album.date || '2026',
          location: album.location || '',
          cover_image: album.coverImage || '',
          description: album.description || '',
          pages: JSON.stringify(album.pages || []),
          is_published: album.isPublished ?? true,
          is_private: album.isPrivate ?? false,
          password: album.password || '',
          watermark_enabled: album.watermarkEnabled ?? true,
          download_allowed: album.downloadAllowed ?? false,
          updated_at: new Date().toISOString()
        };

        await supabase.from('albums').upsert(payload, { onConflict: 'id' });
      } catch (e) {
        console.warn('Supabase save album error:', e);
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
      });
      if (res.ok) {
        const data = await res.json();
        return data.album;
      }
    } catch (e) {
      console.warn('Could not save album to local backend server', e);
    }
    return album;
  },

  deleteAlbum: async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('albums').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase delete album error:', e);
      }
    }

    try {
      await fetch(`${API_BASE_URL}/albums/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete album from backend server', e);
    }
  },

  // 2. Portfolio Stories
  getStories: async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('stories').select('*');
        if (!error && Array.isArray(data) && data.length > 0) return data;
      } catch (e) {}
    }

    try {
      const res = await fetch(`${API_BASE_URL}/stories`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch stories from backend', e);
    }
    return null;
  },

  saveStory: async (story: any) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('stories').upsert(story, { onConflict: 'id' });
      } catch (e) {}
    }

    try {
      const res = await fetch(`${API_BASE_URL}/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not save story to backend', e);
    }
    return null;
  },

  deleteStory: async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('stories').delete().eq('id', id);
      } catch (e) {}
    }

    try {
      await fetch(`${API_BASE_URL}/stories/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete story from backend', e);
    }
  },

  // 3. Leads
  getLeads: async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) return data;
      } catch (e) {}
    }

    try {
      const res = await fetch(`${API_BASE_URL}/leads`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch leads from backend', e);
    }
    return null;
  },

  saveLead: async (lead: any) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('leads').upsert(lead, { onConflict: 'id' });
      } catch (e) {
        console.warn('Supabase save lead error:', e);
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not save lead to backend', e);
    }
    return null;
  },

  updateLeadStatus: async (id: string, status: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('leads').update({ status }).eq('id', id);
      } catch (e) {}
    }

    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not update lead status on backend', e);
    }
    return null;
  },

  deleteLead: async (id: string) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('leads').delete().eq('id', id);
      } catch (e) {}
    }

    try {
      await fetch(`${API_BASE_URL}/leads/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete lead from backend', e);
    }
  },

  // 4. CMS Helpers (Services, Founders, Testimonials, Settings)
  saveService: async (service: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  saveFounder: async (founder: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/founders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(founder)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  saveTestimonial: async (t: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(t)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  deleteTestimonial: async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/testimonials/${id}`, { method: 'DELETE' });
    } catch (e) {}
  },

  saveSettings: async (settings: any) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('site_settings').upsert({ id: 'global_settings', ...settings }, { onConflict: 'id' });
      } catch (e) {}
    }

    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  // 5. High-Capacity Multi-Photo Upload Endpoint (Supabase Storage Bucket + Local Server Disk + High-Capacity Cloud Media Storage)
  uploadPhotos: async (files: File[]): Promise<string[] | null> => {
    // 0. Try Supabase Storage first if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const supabaseUrls: string[] = [];
        for (const file of files) {
          const url = await uploadPhotoToSupabase(file);
          if (url) supabaseUrls.push(url);
        }
        if (supabaseUrls.length > 0) return supabaseUrls;
      } catch (e) {
        console.warn('Supabase storage upload error:', e);
      }
    }

    // 1. Try local Express backend proxy first (/api/upload)
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('photos', file));

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.urls) && data.urls.length > 0) {
          return data.urls;
        }
      }
    } catch (e) {
      console.warn('Local Express server upload unavailable', e);
    }

    // 2. High-Capacity Free Cloud Storage Upload API (for live site https://www.kdcreations.in)
    try {
      const cloudUrls: string[] = [];
      for (const file of files) {
        const cloudFormData = new FormData();
        cloudFormData.append('image', file);

        const cloudRes = await fetch('https://api.imgbb.com/1/upload?key=6d704453d10006761005f15ca8dc1dd2', {
          method: 'POST',
          body: cloudFormData
        });

        if (cloudRes.ok) {
          const cloudData = await cloudRes.json();
          if (cloudData && cloudData.data && cloudData.data.url) {
            cloudUrls.push(cloudData.data.url);
          }
        }
      }

      if (cloudUrls.length > 0) {
        return cloudUrls;
      }
    } catch (err) {
      console.warn('Cloud Media Upload API fallback', err);
    }

    return null;
  }
};
