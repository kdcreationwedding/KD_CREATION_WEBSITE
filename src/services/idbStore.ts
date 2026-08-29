const DB_NAME = 'KdCreationDB';
const DB_VERSION = 1;
const STORE_NAME = 'albums';

const openIDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
};

export const idbStore = {
  // Save all albums to IndexedDB (Multi-GB unlimited storage)
  saveAlbums: async (albums: any[]): Promise<boolean> => {
    try {
      const db = await openIDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      
      // Clear existing and put all
      await new Promise<void>((resolve, reject) => {
        const clearReq = store.clear();
        clearReq.onsuccess = () => resolve();
        clearReq.onerror = () => reject(clearReq.error);
      });

      for (const album of albums) {
        store.put(album);
      }

      return true;
    } catch (e) {
      console.warn('Could not save albums to IndexedDB', e);
      return false;
    }
  },

  // Load all albums from IndexedDB
  getAlbums: async (): Promise<any[] | null> => {
    try {
      const db = await openIDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      return new Promise((resolve) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn('Could not load albums from IndexedDB', e);
      return null;
    }
  }
};
