// Script to fix problematic images
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
}

// Map of problematic images to fix
const imagesToFix = {
  'music-video-referencing': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop',
  'lighting-plan': 'https://images.unsplash.com/photo-1574087988579-da03969ab6fc?q=80&w=800&auto=format&fit=crop',
  'shot-division': 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?q=80&w=800&auto=format&fit=crop',
  'storyboard': 'https://images.unsplash.com/photo-1512025316832-8658f04f8a83?q=80&w=800&auto=format&fit=crop',
  'equipment-setup': 'https://images.unsplash.com/photo-1533069027836-fa937181a8ce?q=80&w=800&auto=format&fit=crop',
  'digipak': 'https://images.unsplash.com/photo-1516900448138-898720802dc5?q=80&w=800&auto=format&fit=crop'
};

// Function to download an image with better error handling
const downloadImage = (url, slug) => {
  return new Promise((resolve, reject) => {
    const filename = path.join(imagesDir, `${slug}.jpg`);
    console.log(`Attempting to download ${slug} from ${url}`);
    
    // Delete the existing file if it exists and is very small (likely corrupt)
    if (fs.existsSync(filename)) {
      const stats = fs.statSync(filename);
      if (stats.size < 1000) { // If file is less than 1KB
        fs.unlinkSync(filename);
        console.log(`Deleted existing small file: ${filename}`);
      }
    }
    
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filename, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
};

// Download each image individually with better error handling
const fixImages = async () => {
  for (const [slug, url] of Object.entries(imagesToFix)) {
    try {
      await downloadImage(url, slug);
      console.log(`Successfully fixed image for: ${slug}`);
    } catch (error) {
      console.error(`Failed to fix image for ${slug}: ${error.message}`);
    }
  }
  
  console.log('Image fixing process completed');
};

// Run the fix
fixImages(); 