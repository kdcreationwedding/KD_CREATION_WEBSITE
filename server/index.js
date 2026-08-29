import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Serve static uploaded images
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer Storage Engine for high-res photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'photo-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max per photo
});

// Database Helper
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      albums: [],
      leads: [],
      stories: [],
      settings: {
        phone: '+91 9033032922',
        whatsapp: '9033032922',
        email: 'info@kdcreations.in',
        address: 'Ahmedabad • Gandhinagar • Vadodara • Surat • Pan India',
        heroTagline: 'CRAFTING LUXURY HEIRLOOM WEDDING FILMS & PHOTOGRAPHY',
        instagramUrl: 'https://www.instagram.com/kd_creation_wedding/',
        youtubeUrl: 'https://www.youtube.com/@kdcreationwedding'
      }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Error reading db.json', e);
    return { albums: [], leads: [], stories: [], settings: {} };
  }
};

const writeDb = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error('Error writing db.json', e);
    return false;
  }
};

// --- REST API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    server: 'KD Creation Node.js Backend Engine',
    timestamp: new Date().toISOString()
  });
});

// 1. Digital Albums Endpoints
app.get('/api/albums', (req, res) => {
  const db = readDb();
  res.json(db.albums || []);
});

app.get('/api/albums/:slugOrId', (req, res) => {
  const db = readDb();
  const clean = req.params.slugOrId.replace(/^#?album-/, '').toLowerCase().trim();
  const found = (db.albums || []).find(
    (a) => a.slug.toLowerCase().trim() === clean || a.id.toLowerCase().trim() === clean || a.id.toLowerCase().trim() === `album-${clean}`
  );
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ error: 'Album not found' });
  }
});

app.post('/api/albums', (req, res) => {
  const db = readDb();
  const album = req.body;
  if (!album || !album.couple) {
    return res.status(400).json({ error: 'Couple name is required' });
  }

  const existingIndex = (db.albums || []).findIndex((a) => a.id === album.id);
  const updatedAlbum = {
    ...album,
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.albums[existingIndex] = updatedAlbum;
  } else {
    db.albums.unshift(updatedAlbum);
  }

  writeDb(db);
  res.json({ success: true, album: updatedAlbum });
});

app.delete('/api/albums/:id', (req, res) => {
  const db = readDb();
  db.albums = (db.albums || []).filter((a) => a.id !== req.params.id);
  writeDb(db);
  res.json({ success: true, id: req.params.id });
});

// Bulk High-Res Photo Upload Endpoint
app.post('/api/upload', upload.array('photos', 50), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files uploaded' });
    }
    const origin = req.protocol + '://' + req.get('host');
    const urls = req.files.map((file) => origin + '/uploads/' + file.filename);
    res.json({ success: true, urls });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 2. Client Booking Leads Endpoints
app.get('/api/leads', (req, res) => {
  const db = readDb();
  res.json(db.leads || []);
});

app.post('/api/leads', (req, res) => {
  const db = readDb();
  const lead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.leads.unshift(lead);
  writeDb(db);
  res.json({ success: true, lead });
});

// 3. Site Settings Endpoint
app.get('/api/settings', (req, res) => {
  const db = readDb();
  res.json(db.settings || {});
});

app.post('/api/settings', (req, res) => {
  const db = readDb();
  db.settings = { ...db.settings, ...req.body };
  writeDb(db);
  res.json({ success: true, settings: db.settings });
});

// Start Node.js Server
app.listen(PORT, () => {
  console.log(`🚀 KD Creation Node.js Express Backend running on http://localhost:${PORT}`);
});
