import { useEffect, useState } from "react";
import Skeleton from "../components/ui/Skeleton";
import { fetchEstadisticasResumen } from "../services/stats.service";
import { getUserWidgets, saveUserWidgets } from "../services/dashboard.service";
import ChartComponent from "../components/ChartComponent";
import MetricasSidebar from "../components/MetricasSidebar";
import WidgetEditable from "../components/WidgetEditable";
import axios from "../utils/axiosInstance";

export default function Estadisticas() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [tipoAnalisis, setTipoAnalisis] = useState("positivo");

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

  const generarAnalisisSimulado = async () => {
    try {
      const res = await axios.post("/api/analisis/simular", { tipo: tipoAnalisis });
      alert("Análisis simulado generado: " + res.data.data.clasificacion);
    } catch (error) {
      alert("Error al simular análisis");
    }
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
    <div className="space-x-2">
      <button
        onClick={toggleModoEdicion}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        {modoEdicion ? "Cerrar edición" : "Personalizar panel"}
      </button>
      <button
        onClick={() => navigate("/widgets/nuevo")}
        className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
      >
        + Crear widget
      </button>
      <button
        onClick={generarAnalisisSimulado}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        Simular análisis
      </button>
      <select
        value={tipoAnalisis}
        onChange={(e) => setTipoAnalisis(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 rounded px-4 py-2"
      >
        <option value="positivo">Positivo</option>
        <option value="neutro">Neutro</option>
        <option value="negativo">Negativo</option>
      </select>
    </div>

  );
}
