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

  // Fetch albums from server
  getAlbums: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/albums`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API server offline, falling back to local memory', e);
    }
    return null;
  },

  // Save album to server
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

  // Delete album from server
  deleteAlbum: async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/albums/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Could not delete album from backend server', e);
    }
  },

  // Upload photo files to server
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

  // Save client booking lead to server
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
