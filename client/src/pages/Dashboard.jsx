import ProductForm from '../components/ProductForm';

export default function Dashboard() {
  const handleAnalyze = (query) => {
    console.log('Enviando a análisis:', query);
    // Aquí luego haremos la petición al backend
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Panel de Análisis</h1>
      <ProductForm onAnalyze={handleAnalyze} />
    </div>
  );
}
