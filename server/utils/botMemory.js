const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../contenido-proyecto.json');

// Carga el JSON si existe
function loadProjectContent() {
  if (!fs.existsSync(filePath)) {
    throw new Error('contenido-proyecto.json no encontrado. Ejecuta dump-content.js primero.');
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

// Verifica si un archivo contiene una palabra clave (como una función)
function fileContains(keyword, relativePath) {
  const content = loadProjectContent();
  if (!content[relativePath]) return false;
  return content[relativePath].includes(keyword);
}

// Busca qué archivos contienen una función específica
function searchFunctionInProject(functionName) {
  const content = loadProjectContent();
  const results = [];

  for (const [filename, code] of Object.entries(content)) {
    if (code.includes(functionName)) {
      results.push(filename);
    }
  }
  return results;
}

module.exports = {
  loadProjectContent,
  fileContains,
  searchFunctionInProject,
};
