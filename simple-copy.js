// Simple file copy script
const fs = require('fs');
const path = require('path');

// Source files
const digipakSource = path.join(__dirname, 'src', 'WhatsApp Image 2025-04-26 at 03.06.14_c532b9ed.jpg');
const lightingPlanSource = path.join(__dirname, 'src', '151230_01_000_title_light_in_photography.webp');

// Destination files
const imagesDir = path.join(__dirname, 'public', 'images', 'blogs');
const digipakDest = path.join(imagesDir, 'digipak.jpg');
const lightingPlanDest = path.join(imagesDir, 'lighting-plan.jpg');

console.log('Starting file copy...');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Copy DigiPak image
try {
  fs.copyFileSync(digipakSource, digipakDest);
  console.log(`Successfully copied DigiPak image: ${digipakSource} -> ${digipakDest}`);
} catch (err) {
  console.error(`Error copying DigiPak image: ${err.message}`);
}

// Copy Lighting Plan image
try {
  fs.copyFileSync(lightingPlanSource, lightingPlanDest);
  console.log(`Successfully copied Lighting Plan image: ${lightingPlanSource} -> ${lightingPlanDest}`);
} catch (err) {
  console.error(`Error copying Lighting Plan image: ${err.message}`);
}

console.log('File copy completed'); 