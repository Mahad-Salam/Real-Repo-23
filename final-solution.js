// Final solution to copy specific images
const fs = require('fs');
const path = require('path');

// Source files (using full absolute paths to avoid any path resolution issues)
const digipakSource = 'C:/Users/HP/Documents/Clients/Mahad/card-blog-tales-main/card-blog-tales-main/src/WhatsApp Image 2025-04-26 at 03.06.14_c532b9ed.jpg';
const lightingPlanSource = 'C:/Users/HP/Documents/Clients/Mahad/card-blog-tales-main/card-blog-tales-main/src/151230_01_000_title_light_in_photography.webp';

// Destination files
const digipakDest = 'C:/Users/HP/Documents/Clients/Mahad/card-blog-tales-main/card-blog-tales-main/public/images/blogs/digipak.jpg';
const lightingPlanDest = 'C:/Users/HP/Documents/Clients/Mahad/card-blog-tales-main/card-blog-tales-main/public/images/blogs/lighting-plan.jpg';

console.log('=== Starting Final Image Solution ===');

// Check if source files exist
console.log('\nChecking source files:');
const digipakSourceExists = fs.existsSync(digipakSource);
const lightingPlanSourceExists = fs.existsSync(lightingPlanSource);

console.log(`DigiPak source (${digipakSource}): ${digipakSourceExists ? 'EXISTS' : 'MISSING'}`);
console.log(`Lighting Plan source (${lightingPlanSource}): ${lightingPlanSourceExists ? 'EXISTS' : 'MISSING'}`);

// Ensure destination directory exists
const destDir = path.dirname(digipakDest);
if (!fs.existsSync(destDir)) {
  try {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`\nCreated destination directory: ${destDir}`);
  } catch (err) {
    console.error(`\nERROR creating destination directory: ${err.message}`);
  }
}

// Copy DigiPak image
console.log('\nCopying DigiPak image:');
if (digipakSourceExists) {
  try {
    fs.copyFileSync(digipakSource, digipakDest);
    const stats = fs.statSync(digipakDest);
    console.log(`SUCCESS: Copied DigiPak image (${Math.round(stats.size / 1024)} KB)`);
  } catch (err) {
    console.error(`ERROR: Failed to copy DigiPak image: ${err.message}`);
  }
} else {
  console.error('ERROR: Cannot copy DigiPak image because source file is missing');
}

// Copy Lighting Plan image
console.log('\nCopying Lighting Plan image:');
if (lightingPlanSourceExists) {
  try {
    fs.copyFileSync(lightingPlanSource, lightingPlanDest);
    const stats = fs.statSync(lightingPlanDest);
    console.log(`SUCCESS: Copied Lighting Plan image (${Math.round(stats.size / 1024)} KB)`);
  } catch (err) {
    console.error(`ERROR: Failed to copy Lighting Plan image: ${err.message}`);
  }
} else {
  console.error('ERROR: Cannot copy Lighting Plan image because source file is missing');
}

// Check if destination files exist
console.log('\nVerifying destination files:');
const digipakDestExists = fs.existsSync(digipakDest);
const lightingPlanDestExists = fs.existsSync(lightingPlanDest);

console.log(`DigiPak destination (${digipakDest}): ${digipakDestExists ? 'EXISTS' : 'MISSING'}`);
console.log(`Lighting Plan destination (${lightingPlanDest}): ${lightingPlanDestExists ? 'EXISTS' : 'MISSING'}`);

console.log('\n=== Final Image Solution Completed ==='); 