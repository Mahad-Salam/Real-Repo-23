// Script to copy text folder to public directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'text folder');
const targetDir = path.join(__dirname, 'public', 'text folder');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from source to target
try {
  const files = fs.readdirSync(sourceDir);
  
  // Delete all existing files in target directory first
  if (fs.existsSync(targetDir)) {
    const existingFiles = fs.readdirSync(targetDir);
    existingFiles.forEach(file => {
      const targetPath = path.join(targetDir, file);
      if (fs.statSync(targetPath).isFile()) {
        fs.unlinkSync(targetPath);
        console.log(`Deleted existing file: ${file}`);
      }
    });
  }
  
  // Now copy the fresh files
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      try {
        // Read the content with encoding detection
        const content = fs.readFileSync(sourcePath, 'utf8');
        // Write with consistent UTF-8 encoding
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log(`Copied ${file} to public/text folder`);
      } catch (err) {
        console.error(`Error copying ${file}:`, err);
      }
    }
  });
  
  console.log('All text files copied to public directory successfully!');
} catch (err) {
  console.error('Error copying text files:', err);
} 