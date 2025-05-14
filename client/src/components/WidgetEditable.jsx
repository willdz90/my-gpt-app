import ChartComponent from "./ChartComponent";

export default function WidgetEditable({ config, editable = false, onDelete }) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 text-gray-800 dark:text-white rounded-xl shadow p-4 hover:ring-1 hover:ring-blue-400 transition">
      {editable && (
        <button
          onClick={onDelete}
          title="Eliminar widget"
          className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 text-lg font-bold focus:outline-none"
        >
          ×
        </button>
      )}

      <h3 className="font-semibold mb-2">{config.titulo || config.nombre || "Widget"}</h3>

      {config.tipoDeGrafico ? (
        <ChartComponent
          data={[
            { fecha: "2025-05-01", [config.metrica]: 5 },
            { fecha: "2025-05-02", [config.metrica]: 8 },
            { fecha: "2025-05-03", [config.metrica]: 4 }
          ]}
          dataKey={config.metrica}
          tipo={config.tipoGrafico}
        />
      ) : (
        <p className="text-sm">Este widget muestra: {config.titulo || config.metrica}</p>
      )}
    </div>
  );
}
