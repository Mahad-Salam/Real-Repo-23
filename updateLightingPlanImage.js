// Script to update the lighting plan image
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');
const targetFile = path.join(imagesDir, 'lighting-plan.jpg');

// New reliable image URL for lighting plan
const imageUrl = 'https://images.unsplash.com/photo-1558393263-2d24b8c46e7f?q=80&w=800&auto=format&fit=crop';

// Delete existing lighting plan image if it exists
if (fs.existsSync(targetFile)) {
  try {
    fs.unlinkSync(targetFile);
    console.log('Deleted existing lighting plan image');
  } catch (error) {
    console.error(`Error deleting existing file: ${error.message}`);
  }
}

// Download new lighting plan image
const file = fs.createWriteStream(targetFile);

https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download image: ${response.statusCode}`);
    return;
  }
  
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log(`Successfully downloaded new lighting plan image to: ${targetFile}`);
  });
  
  file.on('error', (err) => {
    fs.unlink(targetFile, () => {});
    console.error(`Error writing to file: ${err.message}`);
  });
}).on('error', (err) => {
  fs.unlink(targetFile, () => {});
  console.error(`Error downloading image: ${err.message}`);
}); 