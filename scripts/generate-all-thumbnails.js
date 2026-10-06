import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioDir = path.resolve(__dirname, '../public/video-portfolio');
const thumbsDir = path.resolve(__dirname, '../public/assets/video-thumbnails');

if (!fs.existsSync(thumbsDir)) {
  fs.mkdirSync(thumbsDir, { recursive: true });
}

const folders = fs.readdirSync(portfolioDir, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('.'));

console.log(`Starting thumbnail extraction for all video portfolio folders...`);

for (const folder of folders) {
  const folderPath = path.join(portfolioDir, folder.name);
  const files = fs.readdirSync(folderPath, { withFileTypes: true }).filter((f) => f.isFile() && f.name.endsWith('.mp4') && !f.name.startsWith('.'));

  const folderThumbDir = path.join(thumbsDir, folder.name.replace(/[^a-zA-Z0-9_-]/g, '_'));
  if (!fs.existsSync(folderThumbDir)) {
    fs.mkdirSync(folderThumbDir, { recursive: true });
  }

  for (const file of files) {
    const videoPath = path.join(folderPath, file.name);
    const cleanBaseName = file.name.replace(/\.mp4$/i, '').replace(/[^a-zA-Z0-9._-]/g, '_');
    const targetThumbPath = path.join(folderThumbDir, `${cleanBaseName}.jpg`);

    if (fs.existsSync(targetThumbPath)) {
      console.log(`[SKIP] Thumbnail already exists: ${folder.name}/${cleanBaseName}.jpg`);
      continue;
    }

    console.log(`[GENERATING] ${folder.name}/${file.name}...`);
    try {
      // 1. Use macOS qlmanage to extract frame into /tmp
      const tempDir = '/tmp';
      execSync(`qlmanage -t -s 720 -o "${tempDir}" "${videoPath}" 2>/dev/null`, { timeout: 15000 });

      // qlmanage generates: /tmp/<filename>.png
      const generatedPng = path.join(tempDir, `${file.name}.png`);
      if (fs.existsSync(generatedPng)) {
        // Convert PNG to lightweight JPG using macOS sips tool
        execSync(`sips -s format jpeg -s formatOptions 85 "${generatedPng}" --out "${targetThumbPath}" 2>/dev/null`);
        fs.unlinkSync(generatedPng);
        console.log(`✓ Created: ${targetThumbPath}`);
      } else {
        console.warn(`Could not find generated PNG for ${file.name}`);
      }
    } catch (err) {
      console.error(`Failed to generate thumbnail for ${file.name}:`, err.message);
    }
  }
}

console.log(`All video thumbnails extracted successfully!`);
