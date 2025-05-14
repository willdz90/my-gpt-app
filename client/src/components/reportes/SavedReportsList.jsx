import React, { useEffect, useState } from "react";
import { getReportesGuardados } from "../../services/reportes.service";

export default function SavedReportsList({ onSeleccionar }) {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getReportesGuardados().then(({ data }) => setReportes(data));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white">Mis Reportes Guardados</h2>
      {reportes.map(rep => (
        <div key={rep._id} className="border-b pb-2">
          <h3 className="text-md text-gray-700 dark:text-white">{rep.nombre}</h3>
          <p className="text-sm text-gray-500">{rep.descripcion}</p>
          <button
            className="mt-2 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onSeleccionar(rep.configuracion)}
          >
            Ver reporte
          </button>
        </div>
      ))}
    </div>
  );
}
