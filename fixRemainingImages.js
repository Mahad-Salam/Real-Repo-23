// Script to fix remaining problematic images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');

// Map of remaining problematic images to fix with reliable sources
const imagesToFix = {
  'lighting-plan': 'https://images.unsplash.com/photo-1569745358610-b01866003946?q=80&w=800&auto=format&fit=crop', // Reliable studio lighting
  'digipak': 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop' // Reliable album cover
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
const fixRemainingImages = async () => {
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
fixRemainingImages(); 