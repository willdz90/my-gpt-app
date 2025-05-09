// Estadisticas.jsx
import { useEffect, useState } from "react";
import Skeleton from "../components/ui/Skeleton";
import { fetchEstadisticasResumen } from "../services/stats.service";
import { getUserWidgets, saveUserWidgets } from "../services/dashboard.service";
import ChartComponent from "../components/ChartComponent";
import MetricasSidebar from "../components/MetricasSidebar";
import WidgetEditable from "../components/WidgetEditable";

export default function Estadisticas() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const [resStats, resWidgets] = await Promise.all([
        fetchEstadisticasResumen(),
        getUserWidgets()
      ]);

      if (resStats.success) setStats(resStats.data);
      if (resWidgets.success) setWidgets(resWidgets.data);

      setLoading(false);
    };

    cargarDatos();
  }, []);

  const eliminarWidget = (index) => {
    const nuevos = [...widgets];
    nuevos.splice(index, 1);
    setWidgets(nuevos);
  };

  const toggleModoEdicion = async () => {
    if (modoEdicion) {
      const widgetsFormateados = widgets.map((w) => ({
        id: w.id,
        titulo: w.titulo || w.nombre,
        metrica: w.id,
        tipoDeGrafico: w.tipoGrafico || "línea",
        dimension: "estandar",
        rangoFechas: {
          desde: new Date("2025-05-01"),
          hasta: new Date("2025-05-07")
        },
        opcionesAvanzadas: {}
      }));
      await saveUserWidgets(widgetsFormateados);
    }
    setModoEdicion(!modoEdicion);
  };

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Estadísticas del Panel</h1>
          <button
            onClick={toggleModoEdicion}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            {modoEdicion ? "Cerrar edición" : "Personalizar panel"}
          </button>
        </div>

        {/* Gráfico base fijo */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Evolución semanal</h2>
          <ChartComponent data={stats.historico} />
        </div>

        {/* Widgets personalizados (siempre visibles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget, index) => (
            <WidgetEditable
              key={index}
              config={widget}
              editable={modoEdicion}
              onDelete={() => eliminarWidget(index)}
            />
          ))}
        </div>
      </div>

      {modoEdicion && (
        <MetricasSidebar onAdd={(w) => setWidgets((prev) => [...prev, w])} />
      )}
    </div>
  );
}