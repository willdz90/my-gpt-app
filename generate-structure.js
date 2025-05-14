const fs = require('fs').promises;
const path = require('path');

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ['client', 'server'];
const OUTPUT_FILE = 'estructura-proyecto-extendida.json';
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

function extractImports(content) {
  const importRegex = /import\s.+\sfrom\s['"].+['"];?/g;
  return content.match(importRegex) || [];
}

function extractTailwindClasses(content) {
  const classRegex = /class(Name)?=["'`]{1}([^"'`]+)["'`]{1}/g;
  let classes = [];
  let match;
  while ((match = classRegex.exec(content)) !== null) {
    classes.push(...match[2].split(/\s+/));
  }
  return [...new Set(classes)];
}

async function generateStructure() {
  let structure = {};

  for (let dir of TARGET_DIRS) {
    const fullDirPath = path.join(ROOT_DIR, dir);
    const files = await getAllFiles(fullDirPath);

    for (let filePath of files) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const stats = await fs.stat(filePath);
        const relativePath = path.relative(ROOT_DIR, filePath);

        structure[relativePath] = {
          imports: extractImports(content),
          tailwindClasses: extractTailwindClasses(content),
          lastModified: stats.mtime,
          size: stats.size
        };
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    }
  }

  try {
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(structure, null, 2), 'utf-8');
    console.log(`✅ Estructura guardada en ${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`❌ Error writing to ${OUTPUT_FILE}:`, error.message);
  }
}

generateStructure();
