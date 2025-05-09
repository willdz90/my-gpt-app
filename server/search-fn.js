const botMemory = require('./utils/botMemory');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('❌ Debes indicar el nombre de la función a buscar.');
  process.exit(1);
}

const functionName = args[0];
console.log(`🔍 Buscando "${functionName}" en el proyecto...`);

try {
  const results = botMemory.searchFunctionInProject(functionName);
  if (results.length === 0) {
    console.log('🔎 No se encontró ningún archivo que contenga esa función.');
  } else {
    console.log('✅ Función encontrada en:');
    results.forEach(file => console.log(` - ${file}`));
  }
} catch (error) {
  console.error('⚠️ Error al buscar:', error.message);
}
