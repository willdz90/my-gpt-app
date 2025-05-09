import ChartComponent from "./ChartComponent";

export default function WidgetEditable({ config, editable = false, onDelete }) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow p-4 hover:ring-1 hover:ring-blue-400 transition">
      {editable && (
        <button
          onClick={onDelete}
          title="Eliminar widget"
          className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 text-lg font-bold focus:outline-none"
        >
          ×
        </button>
      )}

      <h3 className="font-semibold mb-2">{config.nombre}</h3>

      {config.tipo === "grafico" && config.tipoGrafico ? (
        <ChartComponent
          data={[
            { fecha: "2025-05-01", [config.id]: 5 },
            { fecha: "2025-05-02", [config.id]: 8 },
            { fecha: "2025-05-03", [config.id]: 4 }
          ]}
          dataKey={config.id}
          tipo={config.tipoGrafico}
        />
      ) : config.tipo === "tabla" ? (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-1">Fecha</th>
              <th className="text-left py-1">{config.nombre}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-05-01</td>
              <td>3</td>
            </tr>
            <tr>
              <td>2025-05-02</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-sm">Este widget muestra: {config.nombre}</p>
      )}
    </div>
  );
}
