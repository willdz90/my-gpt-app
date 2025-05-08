export default function ToolbarReporte({ title, setTitle, onGuardar, onVolver }) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title || 'Nuevo reporte'}
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={onVolver}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              ← Volver
            </button>
            <button
              onClick={onGuardar}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Guardar reporte
            </button>
          </div>
        </div>
  
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del reporte"
          className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
        />
      </div>
    );
  }
  