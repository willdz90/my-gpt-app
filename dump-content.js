const fs = require('fs');
const path = require('path');

const ROOT_DIRS = ['client', 'server'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build'];
const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'];

const result = {};

function walkAndRead(dir, base) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(base, fullPath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        walkAndRead(fullPath, base);
      }
    } else if (ALLOWED_EXTENSIONS.includes(path.extname(file))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      result[relPath.replace(/\\/g, '/')] = content;
    }
  }
}

for (const root of ROOT_DIRS) {
  if (fs.existsSync(root)) {
    walkAndRead(root, root);
  }
}

fs.writeFileSync('contenido-proyecto.json', JSON.stringify(result, null, 2), 'utf8');
console.log('📄 contenido-proyecto.json generado con el código fuente incluido.');
