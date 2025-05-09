const fs = require('fs');
const path = require('path');

const ROOT_DIRS = ['client', 'server'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', '.tmp.drivedownload', '.tmp.driveupload'];
const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'];

function scanDir(baseDir) {
  const structure = {};

  function walk(dir, relativeTo) {
    const result = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relPath = path.relative(relativeTo, fullPath);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!EXCLUDE_DIRS.includes(item)) {
          const subItems = walk(fullPath, relativeTo);
          if (subItems.length > 0) {
            result.push({ [item]: subItems });
          }
        }
      } else {
        if (ALLOWED_EXTENSIONS.includes(path.extname(item))) {
          result.push(item);
        }
      }
    }
    return result;
  }

  for (const root of ROOT_DIRS) {
    if (fs.existsSync(root)) {
      structure[root] = walk(root, root);
    }
  }

  fs.writeFileSync('estructura-proyecto.json', JSON.stringify(structure, null, 2), 'utf8');
  console.log('✅ estructura-proyecto.json generado correctamente.');
}

scanDir();
