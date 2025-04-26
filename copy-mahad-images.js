import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination directories
const sourceDir = path.join(__dirname, 'mahad');
const destinationDir = path.join(__dirname, 'public', 'mahad');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
  console.log(`Created destination directory: ${destinationDir}`);
}

// Get all files from the source directory
const files = fs.readdirSync(sourceDir);

// Copy each file to the destination directory
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destinationDir, file);
  
  // Check if it's a file (not a directory)
  if (fs.statSync(sourcePath).isFile()) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied: ${file} -> ${destPath}`);
  }
});

console.log('All Mahad images copied successfully!'); 