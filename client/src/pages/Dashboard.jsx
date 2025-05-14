import { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";
import axios from "../utils/axiosInstance";

export default function Dashboard() {
  const [dataLine, setDataLine] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await axios.get("/stats/resumen");
        if (res.data.success && res.data.data?.historico) {
          setDataLine(res.data.data.historico);
        }
      } catch (error) {
        console.error("Error al cargar datos del dashboard", error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="p-4 space-y-6 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold">Panel Principal</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Análisis Recientes</h2>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Cargando datos...</p>
        ) : dataLine.length > 0 ? (
          <ChartComponent data={dataLine} />
        ) : (
          <p className="text-gray-500 dark:text-gray-300">No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
}
