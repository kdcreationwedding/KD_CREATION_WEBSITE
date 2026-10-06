import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioDir = path.resolve(__dirname, '../public/video-portfolio');
const outputFile = path.resolve(__dirname, '../src/config/videoEditingData.ts');

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.m4v', '.mkv']);
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const FOLDER_METADATA = {
  'ai': {
    gujarati: 'AI સિનેમેટિક એડિટ્સ અને કંકોત્રી લેખન',
    poster: 'assets/yash-kavya-outer-cover.jpg',
    badge: 'AI VISUAL ARTS & STORYTELLING',
    icon: 'Sparkles',
    desc: 'Cutting-edge AI-assisted video storytelling, virtual invitations, and animated legacy reels.'
  },
  'highlight': {
    gujarati: 'સિનેમેટિક વેડિંગ અને ઇવેન્ટ હાઇલાઇટ્સ',
    poster: 'assets/kaushik-anjali-outer-cover.jpg',
    badge: 'NARRATIVE 4K CINEMA HIGHLIGHTS',
    icon: 'Video',
    desc: 'Bespoke multi-cam wedding highlights capturing raw emotion, family tears, sacred rituals, and celebrations.'
  },
  'portraits': {
    gujarati: 'બ્રાઇડલ & કપલ સિનેમેટિક પોર્ટ્રેટ્સ',
    poster: 'assets/service-bride-mirror.jpg',
    badge: 'FINE-ART PORTRAIT CINE CUTS',
    icon: 'Smartphone',
    desc: 'Editorial slow-motion portrait films focusing on intricate bridal jewelry, royal attire, and emotional eyes.'
  },
  'pre-wedding': {
    gujarati: 'પ્રી-વેડિંગ સિનેમેટિક મ્યુઝિક સ્ટોરીઝ',
    poster: 'assets/service-prewedding-dhaval-sangita.jpg',
    badge: 'PRE-WEDDING CINEMA SCOPE',
    icon: 'Sliders',
    desc: 'Dreamy pre-wedding concept films cut with romantic speed ramps, drone perspectives, and acoustic lyrical flow.'
  },
  'reel': {
    gujarati: 'ઇન્સ્ટાગ્રામ 9:16 વાયરલ રીલ્સ',
    poster: 'assets/dhaval-sangeeta-outer-cover.jpg',
    badge: 'VERTICAL 9:16 VIRAL EDITS',
    icon: 'Smartphone',
    desc: 'Fast-paced, hook-driven vertical edits engineered for Instagram feeds with mobile OLED punch and beat drops.'
  },
  'teaser': {
    gujarati: 'સિનેમેટિક વેડિંગ ટીઝર્સ (2.39:1)',
    poster: 'assets/vishwa-dhawal-outer-cover.jpg',
    badge: 'ANAMORPHIC CINEMA TEASERS',
    icon: 'Film',
    desc: 'High-adrenaline 60–90 second widescreen trailers with orchestral rise and dialogue snips.'
  },
  'vehicle-delivery': {
    gujarati: 'રોયલ કાર ડિલિવરી અને સેલિબ્રેશન હાઇલાઇટ્સ',
    poster: 'assets/service-complete-coverage.jpg',
    badge: 'DELIVERY HIGHLIGHT SPECIAL',
    icon: 'Scissors',
    desc: 'Cinematic automobile delivery celebrations capturing the proud milestone moments with family.'
  }
};

// Known YouTube embeds for KD Creation films
const KNOWN_YOUTUBE_LINKS = {
  'pre-wedding-teaser-song-dhawal-sangita': 'https://youtu.be/mJ49EXaTXO8',
  'save-the-date-dhawal-kd-creation': 'https://youtu.be/x7782vFootg',
  'sameday-dhawal-highlight-ai': 'https://youtu.be/mJ49EXaTXO8',
  'wedding-reel-kd-creation': 'https://youtu.be/x7782vFootg'
};

function formatTitle(name) {
  return name
    .replace(/^[\d\s-_]+/, '') // Remove leading numbers
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function scan() {
  if (!fs.existsSync(portfolioDir)) {
    console.log(`Directory does not exist: ${portfolioDir}`);
    return;
  }

  const entries = fs.readdirSync(portfolioDir, { withFileTypes: true });
  const folderEntries = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.'));

  if (folderEntries.length === 0) {
    console.log('No folders found inside public/video-portfolio/. Please paste your folders there!');
    return;
  }

  const folders = [];
  const projects = [];

  folderEntries.forEach((folder, folderIdx) => {
    const folderPath = path.join(portfolioDir, folder.name);
    const folderId = folder.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `folder-${folderIdx + 1}`;
    const folderCode = `DIR_${String(folderIdx + 1).padStart(2, '0')}_${folder.name.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`;
    const folderTitle = formatTitle(folder.name);

    const meta = FOLDER_METADATA[folderId] || {
      gujarati: folderTitle,
      poster: 'assets/kd-logo.jpg',
      badge: `${folderTitle.toUpperCase()} MASTER SUITE`,
      icon: 'Film',
      desc: `Curated collection of ${folderTitle} video edits and post-production sequences.`
    };

    const files = fs.readdirSync(folderPath, { withFileTypes: true });

    // Filter valid media files (ignore hidden/empty dot files like .mp4)
    const videoFiles = files.filter((f) => f.isFile() && !f.name.startsWith('.') && VIDEO_EXTS.has(path.extname(f.name).toLowerCase()));
    const imageFiles = files.filter((f) => f.isFile() && !f.name.startsWith('.') && IMAGE_EXTS.has(path.extname(f.name).toLowerCase()));

    const folderProjects = [];

    // Process each video file
    videoFiles.forEach((vFile, vIdx) => {
      const ext = path.extname(vFile.name);
      const baseName = path.basename(vFile.name, ext);
      const title = formatTitle(baseName);
      const slugKey = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      const mappingFile = path.resolve(__dirname, 'r2-video-urls.json');
      let mapping = {};
      try {
        if (fs.existsSync(mappingFile)) {
          mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
        }
      } catch (e) {}

      const relativeKey = `video-portfolio/${folder.name}/${vFile.name}`;
      const r2DefaultUrl = `https://pub-ab2255cdffb74b42b851c495d86cc164.r2.dev/video-portfolio/${folder.name.replace(/[^a-zA-Z0-9_-]/g, '_')}/${vFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const ytLink = KNOWN_YOUTUBE_LINKS[slugKey];
      const videoUrl = mapping[relativeKey] || ytLink || r2DefaultUrl;

      const cleanBaseName = vFile.name.replace(/\.mp4$/i, '').replace(/[^a-zA-Z0-9._-]/g, '_');
      const folderSafe = folder.name.replace(/[^a-zA-Z0-9_-]/g, '_');
      const extractedThumb = `assets/video-thumbnails/${folderSafe}/${cleanBaseName}.jpg`;
      const hasExtracted = fs.existsSync(path.resolve(__dirname, '../public', extractedThumb));

      const matchingImg = imageFiles.find((img) => path.basename(img.name, path.extname(img.name)) === baseName);
      const thumbnail = hasExtracted
        ? extractedThumb
        : matchingImg
        ? `video-portfolio/${folder.name}/${matchingImg.name}`
        : meta.poster;

      const isVertical = folder.name.toLowerCase().includes('reel') || title.toLowerCase().includes('reel');

      folderProjects.push({
        id: `proj-${folderId}-${vIdx + 1}`,
        folderId,
        title: title || `${folderTitle} Project ${vIdx + 1}`,
        client: 'KD Creation Official Client',
        eventDate: 'Cinema Master Edit',
        aspectRatio: isVertical ? '9:16 Vertical Reel' : '16:9 4K Master',
        duration: isVertical ? '00:50' : '02:30',
        resolution: '4K Ultra HD',
        software: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro'],
        tags: isVertical
          ? ['9:16 Mobile Cut', 'Beat Sync', 'Punchy Bass', 'Color Pop']
          : ['Multi-Cam Sync', 'Film Emulation', 'Dialogue Foley', '4K Master'],
        thumbnail,
        videoUrl,
        description: `${title} — Official post-production cut curated under ${folderTitle}.`,
        keyFeature: 'Master 4K Edit with Color Grading & Sound Design'
      });
    });

    if (folderProjects.length > 0) {
      folders.push({
        id: folderId,
        folderCode,
        name: folderTitle,
        nameGujarati: meta.gujarati,
        badge: `${folderProjects.length} PROJECT EDITS`,
        iconName: meta.icon,
        description: meta.desc,
        softwareStack: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro', 'Logic Pro X'],
        workflowHighlights: ['Color Grading & LUT Emulation', '4K Multi-Cam Sync', 'Sound Design & Foley']
      });

      projects.push(...folderProjects);
    }
  });

  // Generate clean TypeScript data configuration
  const tsContent = `export interface VideoEditingProject {
  id: string;
  folderId: string;
  title: string;
  client: string;
  eventDate: string;
  aspectRatio: string;
  duration: string;
  resolution: string;
  software: string[];
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  description: string;
  keyFeature: string;
}

export interface VideoEditingFolder {
  id: string;
  folderCode: string;
  name: string;
  nameGujarati: string;
  badge: string;
  iconName: 'Film' | 'Video' | 'Smartphone' | 'Sliders' | 'Sparkles' | 'Scissors';
  description: string;
  softwareStack: string[];
  workflowHighlights: string[];
}

export const VIDEO_EDITING_FOLDERS: VideoEditingFolder[] = ${JSON.stringify(folders, null, 2)};

export const VIDEO_EDITING_PROJECTS: VideoEditingProject[] = ${JSON.stringify(projects, null, 2)};

export const POST_PRODUCTION_STATS = [
  { value: '${projects.length}+', label: 'Curated Video Edits', sub: 'Crafted with narrative mastery' },
  { value: '4K UHD', label: 'Master Delivery', sub: 'Native ProRes & HDR options' },
  { value: '48h', label: 'Express Teaser Delivery', sub: 'Ready for Instagram & WhatsApp' },
  { value: '10-Bit', label: 'Color Calibrated Grading', sub: 'DaVinci Resolve Studio 19' }
];
`;

  fs.writeFileSync(outputFile, tsContent, 'utf-8');
  console.log(`Scan Complete! Found ${folders.length} folders and ${projects.length} video projects.`);
}

scan();
