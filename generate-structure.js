const fs = require('fs');
const path = require('path');

const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', '.tmp.drivedownload', '.tmp.driveupload'];

function walk(dir, indent = '', lines = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(item)) {
        lines.push(`${indent}${item}/`);
        walk(fullPath, indent + '  ', lines);
      }
    } else {
      lines.push(`${indent}${item}`);
    }
  }
  return lines;
}

const output = walk('.', '');
fs.writeFileSync('estructura-proyecto.txt', output.join('\n'), 'utf8');
console.log('✅ estructura-proyecto.txt generado sin node_modules.');
