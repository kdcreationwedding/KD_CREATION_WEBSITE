const API_BASE_URL = 'http://localhost:5000/api';

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

  // 1. Digital Albums
  getAlbums: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/albums`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API server offline, falling back to local memory', e);
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
      console.warn('Could not save album to backend server', e);
    }
    return null;
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

  // 3. Signature Services
  getServices: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch services from backend', e);
    }
    return null;
  },

  saveService: async (service: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not save service to backend', e);
    }
    return null;
  },

  // 4. Founders
  getFounders: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/founders`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch founders from backend', e);
    }
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
    } catch (e) {
      console.warn('Could not save founder to backend', e);
    }
    return null;
  },

  // 5. Testimonials
  getTestimonials: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch testimonials from backend', e);
    }
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
    } catch (e) {
      console.warn('Could not save testimonial to backend', e);
    }
    return null;
  },

  deleteTestimonial: async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/testimonials/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete testimonial from backend', e);
    }
  },

  // 6. Site Settings
  getSettings: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not fetch settings from backend', e);
    }
    return null;
  },

  saveSettings: async (settings: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Could not save settings to backend', e);
    }
    return null;
  },

  // 7. Bulk Upload Photos
  uploadPhotos: async (files: File[]): Promise<string[] | null> => {
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append('photos', file);
      }
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        return data.urls || [];
      }
    } catch (e) {
      console.warn('Photo upload to backend server failed', e);
    }
    return null;
  },

  // 8. Booking Leads
  saveLead: async (leadData: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Lead save to backend server failed', e);
    }
    return null;
  }
};
