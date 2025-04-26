// Script to check if images exist and display their sizes
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');

// Files to check
const filesToCheck = [
  'digipak.jpg',
  'lighting-plan.jpg'
];

console.log('Checking image files:');

filesToCheck.forEach(filename => {
  const filePath = path.join(imagesDir, filename);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const fileSizeKB = Math.round(stats.size / 1024);
    console.log(`✅ ${filename} exists (${fileSizeKB} KB)`);
  } else {
    console.log(`❌ ${filename} does NOT exist`);
  }
});

console.log('Image check completed'); 