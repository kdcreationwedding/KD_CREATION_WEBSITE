import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qrljgqlisbfchspwgiwe.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_9lH15TiavVbVnP0NO1ubIw_SjHh1wUx';
const SUPABASE_JWKS_URL = process.env.SUPABASE_JWKS_URL || 'https://qrljgqlisbfchspwgiwe.supabase.co/auth/v1/.well-known/jwks.json';

const supabase = (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

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

// MongoDB Mongoose Schemas (Optional 24/7 MongoDB Atlas Cloud Database Integration)
let isMongoConnected = false;

const AlbumSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  title: String,
  couple: { type: String, required: true },
  subtitle: String,
  date: String,
  location: String,
  coverImage: String,
  description: String,
  pages: [String],
  isPublished: { type: Boolean, default: true },
  isPrivate: { type: Boolean, default: false },
  password: String,
  watermarkEnabled: { type: Boolean, default: true },
  downloadAllowed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const AlbumModel = mongoose.model('Album', AlbumSchema);

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas Cloud Database!');
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB Atlas Connection Error, falling back to local JSON database:', err.message);
    });
}

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

// JSON File Database Helper
const readDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      albums: [],
      leads: [],
      stories: [],
      services: [],
      founders: [],
      testimonials: [],
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
    return { albums: [], leads: [], stories: [], services: [], founders: [], testimonials: [], settings: {} };
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
    database: isMongoConnected ? 'MongoDB Atlas Cloud' : 'JSON Disk Engine',
    server: 'KD Creation Node.js Backend Engine',
    timestamp: new Date().toISOString()
  });
});

// 1. Digital Albums Endpoints
app.get('/api/albums', async (req, res) => {
  if (isMongoConnected) {
    try {
      const albums = await AlbumModel.find().sort({ updatedAt: -1 });
      return res.json(albums);
    } catch (e) {
      console.warn('MongoDB query failed, falling back to JSON db', e);
    }
  }

  const db = readDb();
  res.json(db.albums || []);
});

app.post('/api/albums', async (req, res) => {
  const albumData = req.body;
  if (!albumData || !albumData.couple || !albumData.slug) {
    return res.status(400).json({ error: 'Couple name and slug are required.' });
  }

  const albumId = albumData.id || `album-${Date.now()}`;
  const albumToSave = {
    ...albumData,
    id: albumId,
    updatedAt: new Date().toISOString()
  };

  // If MongoDB connected, upsert into MongoDB Atlas
  if (isMongoConnected) {
    try {
      await AlbumModel.findOneAndUpdate({ id: albumId }, albumToSave, { upsert: true, new: true });
    } catch (e) {
      console.warn('MongoDB save failed, persisting to db.json', e);
    }
  }

  // Always persist in local JSON db.json as backup
  const db = readDb();
  const existingIdx = (db.albums || []).findIndex((a) => a.id === albumId);

  if (existingIdx >= 0) {
    db.albums[existingIdx] = albumToSave;
  } else {
    db.albums.unshift(albumToSave);
  }

  writeDb(db);
  res.json({ success: true, album: albumToSave });
});

app.delete('/api/albums/:id', async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await AlbumModel.deleteOne({ id });
    } catch (e) {}
  }

  const db = readDb();
  db.albums = (db.albums || []).filter((a) => a.id !== id);
  writeDb(db);
  res.json({ success: true, message: `Album ${id} deleted` });
});

// 2. Portfolio Stories Endpoints
app.get('/api/stories', (req, res) => {
  const db = readDb();
  res.json(db.stories || []);
});

app.post('/api/stories', (req, res) => {
  const story = req.body;
  const db = readDb();
  const index = (db.stories || []).findIndex((s) => s.id === story.id);

  if (index >= 0) {
    db.stories[index] = story;
  } else {
    db.stories.unshift(story);
  }

  writeDb(db);
  res.json({ success: true, story });
});

app.delete('/api/stories/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.stories = (db.stories || []).filter((s) => s.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// 3. Leads Endpoints
app.get('/api/leads', (req, res) => {
  const db = readDb();
  res.json(db.leads || []);
});

app.post('/api/leads', (req, res) => {
  const lead = req.body;
  const db = readDb();
  const newLead = {
    ...lead,
    id: lead.id || `lead-${Date.now()}`,
    status: lead.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  db.leads.unshift(newLead);
  writeDb(db);
  res.json({ success: true, lead: newLead });
});

app.patch('/api/leads/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDb();
  const lead = (db.leads || []).find((l) => l.id === id);

  if (lead) {
    lead.status = status;
    writeDb(db);
    res.json({ success: true, lead });
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.leads = (db.leads || []).filter((l) => l.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// 4. CMS Settings & Services Endpoints
app.get('/api/settings', (req, res) => {
  const db = readDb();
  res.json(db.settings || {});
});

app.post('/api/settings', (req, res) => {
  const settings = req.body;
  const db = readDb();
  db.settings = { ...db.settings, ...settings };
  writeDb(db);
  res.json({ success: true, settings: db.settings });
});

// 5. High-Resolution Multi-Photo Upload Endpoint
app.post('/api/upload', upload.array('photos', 50), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const urls = req.files.map((file) => `uploads/${file.filename}`);
  res.json({ success: true, urls });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 KD Creation Node.js Backend Server running on http://localhost:${PORT}`);
  console.log(`📂 Uploads directory: ${UPLOADS_DIR}`);
  console.log(`🗄️ Database file: ${DB_FILE}`);
  if (MONGODB_URI) {
    console.log(`🌐 MongoDB Atlas target: ${MONGODB_URI.substring(0, 20)}...`);
  }
});
