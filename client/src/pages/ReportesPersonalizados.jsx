import React, { useState } from "react";
import QueryBuilder from "../components/reportes/QueryBuilder";
import ReportViewer from "../components/reportes/ReportViewer";
import SavedReportsList from "../components/reportes/SavedReportsList";
import { ejecutarReporte } from "../services/reportes.service";
import { toast } from "react-toastify";

export default function ReportesPersonalizados() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEjecutar = async (config) => {
    setLoading(true);
    setResultado(null);
    try {
      const { data } = await ejecutarReporte(config);
      setResultado(data);
    } catch (err) {
      toast.error("Error ejecutando el reporte.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Reportes Personalizados
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SavedReportsList onSeleccionar={handleEjecutar} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <QueryBuilder onEjecutar={handleEjecutar} loading={loading} />
          <ReportViewer datos={resultado} />
        </div>
      </div>
    </div>
  );
}
