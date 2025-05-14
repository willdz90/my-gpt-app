// src/pages/ReporteDetalle.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalisisPorId } from "../services/product.service";
import TablaReporte from "../components/reportes/TablaReporte";

export default function ReporteDetalle() {
  const { id } = useParams();
  const [analisis, setAnalisis] = useState(null);
  const [columnOrder, setColumnOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, data } = await getAnalisisPorId(id);
        if (success) {
          setAnalisis(data);
          setColumnOrder(data?.campos?.map((c) => c.nombre) || []);
        } else {
          setError("No se pudo cargar el análisis.");
        }
      } catch (err) {
        setError("Error al obtener el análisis.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const columnas =
    analisis?.campos?.map((col) => ({
      id: col.nombre,
      header: col.nombre,
    })) || [];

  const datos = analisis?.datos || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">🧠 Reporte Detallado</h1>

      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-300">Cargando análisis...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!loading && analisis && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">
            {analisis.nombre || "Análisis sin título"}
          </h2>

          <TablaReporte
            columns={columnas}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
            data={datos}
          />
        </div>
      )}
    </div>
  );
}
