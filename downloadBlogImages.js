// Script to download images for blog posts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory');
}

// STEP 1: Copy local files as requested by user
console.log('Copying local image files as requested...');

// DigiPak image - Copy from WhatsApp image
const digipakSource = path.join(__dirname, 'src', 'WhatsApp Image 2025-04-26 at 03.06.14_c532b9ed.jpg');
const digipakDest = path.join(imagesDir, 'digipak.jpg');

try {
  fs.copyFileSync(digipakSource, digipakDest);
  console.log(`Successfully copied DigiPak image to ${digipakDest}`);
} catch (err) {
  console.error(`Error copying DigiPak image: ${err.message}`);
}

// Lighting Plan image - Copy from webp file
const lightingPlanSource = path.join(__dirname, 'src', '151230_01_000_title_light_in_photography.webp');
const lightingPlanDest = path.join(imagesDir, 'lighting-plan.jpg');

try {
  fs.copyFileSync(lightingPlanSource, lightingPlanDest);
  console.log(`Successfully copied Lighting Plan image to ${lightingPlanDest}`);
} catch (err) {
  console.error(`Error copying Lighting Plan image: ${err.message}`);
}

// Map of blog slugs to relevant image URLs
const imageUrls = {
  'genre-research': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
  'music-video-referencing': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop', // Music video reference
  'website-analysis': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop',
  'institution-research': 'https://images.unsplash.com/photo-1529148482759-b35b25c5f217?q=80&w=800&auto=format&fit=crop',
  'director-research': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
  'storyboard': 'https://plus.unsplash.com/premium_photo-1661573111700-05d1d8c9e21a?q=80&w=800&auto=format&fit=crop', // Film storyboard
  'mise-en-scene': 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
  'screenplay': 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=800&auto=format&fit=crop',
  'music-video-concept': 'https://images.unsplash.com/photo-1560800589-3d88290dd749?q=80&w=800&auto=format&fit=crop', // Dreamy, surreal concept image
  'music-video-treatment': 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?q=80&w=800&auto=format&fit=crop',
  'prop-list': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', // Lighter and props collection
  'character-profile': 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=800&auto=format&fit=crop',
  'shot-division': 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?q=80&w=800&auto=format&fit=crop', // Camera shot setup
  'behind-the-scenes': 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=800&auto=format&fit=crop',
  'equipment-setup': 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce?q=80&w=800&auto=format&fit=crop', // Camera equipment
  'production-challenges': 'https://images.unsplash.com/photo-1532800783378-1bed60adaf58?q=80&w=800&auto=format&fit=crop',
  'editing-process': 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop',
  'artist-website': 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
  'ccr': 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=800&auto=format&fit=crop' // Social media marketing research
};

// Function to download an image
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    // Skip digipak and lighting-plan as they were copied from local files
    if (filename.includes('digipak.jpg') || filename.includes('lighting-plan.jpg')) {
      console.log(`Skipping download for ${filename} (using local file instead)`);
      resolve();
      return;
    }
    
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
};

// Download all images
const downloadAllImages = async () => {
  const promises = [];
  for (const [slug, url] of Object.entries(imageUrls)) {
    // Skip digipak and lighting-plan as they were copied from local files
    if (slug === 'digipak' || slug === 'lighting-plan') {
      continue;
    }
    
    const filename = path.join(imagesDir, `${slug}.jpg`);
    promises.push(downloadImage(url, filename));
  }
  
  try {
    await Promise.all(promises);
    console.log('All images downloaded successfully');
  } catch (error) {
    console.error('Error downloading some images:', error);
  }
};

// Run the download
downloadAllImages(); 