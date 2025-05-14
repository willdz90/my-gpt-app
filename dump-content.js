const fs = require('fs').promises;
const path = require('path');

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ['client', 'server'];
const OUTPUT_FILE = 'contenido-proyecto.json';
const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'];
const EXCLUDED_PATHS = ['node_modules', '.git', '.env'];

async function getAllFiles(dirPath) {
  let entries = await fs.readdir(dirPath, { withFileTypes: true });
  let files = [];

  for (let entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (EXCLUDED_PATHS.some(ex => relPath.includes(ex))) continue;

    if (entry.isDirectory()) {
      files = files.concat(await getAllFiles(fullPath));
    } else if (ALLOWED_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function generateContent() {
  let allFiles = {};

  for (let dir of TARGET_DIRS) {
    const fullDirPath = path.join(ROOT_DIR, dir);
    const files = await getAllFiles(fullDirPath);

    for (let filePath of files) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const relativePath = path.relative(ROOT_DIR, filePath);
        allFiles[relativePath] = content;
      } catch (error) {
        console.error(`❌ Error reading ${filePath}:`, error.message);
      }
    }
  }

  try {
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(allFiles, null, 2), 'utf-8');
    console.log(`✅ Contenido del proyecto guardado en ${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`❌ Error writing to ${OUTPUT_FILE}:`, error.message);
  }
}

generateContent();
