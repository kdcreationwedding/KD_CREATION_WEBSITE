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

  // 1. Digital Albums - 24/7 Cloud Sync from GitHub Cloud DB + Local Backend
  getAlbums: async () => {
    // 1. Try local Express backend proxy first
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
    try {
      await fetch(`${API_BASE_URL}/albums/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete album from backend server', e);
    }
  },

  // 2. Portfolio Stories
  getStories: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/stories`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch stories from backend', e);
    }
    return null;
  },

  saveStory: async (story: any) => {
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
    try {
      await fetch(`${API_BASE_URL}/stories/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete story from backend', e);
    }
  },

  // 3. Leads
  getLeads: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch leads from backend', e);
    }
    return null;
  },

  saveLead: async (lead: any) => {
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

  // 5. Photo Upload Endpoint directly to disk/cloud
  uploadPhotos: async (files: File[]): Promise<string[] | null> => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('photos', file));

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        return data.urls || [];
      }
    } catch (e) {
      console.warn('Backend photo upload unavailable, using portable HD encoding', e);
    }
    return null;
  }
};
