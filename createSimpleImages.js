// Simple script to create placeholder images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');

// Ensure the directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory');
}

// Function to copy a file from one location to another
const copyFile = (source, destination) => {
  try {
    fs.copyFileSync(source, destination);
    console.log(`Successfully copied ${source} to ${destination}`);
    return true;
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
    return false;
  }
};

// Copy a working image multiple times with different names to ensure all blogs have images
const sourceImage = path.join(__dirname, 'public', 'images', 'blogs', 'music-video-concept.jpg');

if (fs.existsSync(sourceImage)) {
  const targetFiles = [
    'lighting-plan.jpg',
    'storyboard.jpg',
    'digipak.jpg',
    'equipment-setup.jpg',
    'shot-division.jpg',
    'music-video-referencing.jpg'
  ];
  
  targetFiles.forEach(targetFile => {
    const targetPath = path.join(imagesDir, targetFile);
    copyFile(sourceImage, targetPath);
  });
  
  console.log('All required images created');
} else {
  console.error('Source image for copying not found');
} 