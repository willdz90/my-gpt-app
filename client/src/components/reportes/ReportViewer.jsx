import React, { useState } from "react";
import ChartComponent from "./ChartComponent";
import TablaInteractiva from "../TablaInteractiva";
import ReporteEncabezado from "./ReporteEncabezado";

export default function ReportViewer({ datos }) {
  const [tipoGrafico, setTipoGrafico] = useState("bar");
  const tiposGraficos = ["bar", "line", "area", "pie"];

  if (!datos || (!datos.grafico && !datos.tabla)) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center text-gray-600 dark:text-gray-300">
        No hay resultados disponibles para esta configuración.
      </div>
    );
  }

  const chartData = {
    labels: datos?.grafico?.labels || [],
    datasets: [
      {
        label: datos?.metricaPrincipal || "Resultado",
        data: datos?.grafico?.values || [],
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <ReporteEncabezado
        nombre={datos?.nombre || "Reporte dinámico"}
        fecha={new Date()}
        filtros={datos?.filtros || {}}
      />

      {datos?.grafico && (
        <ChartComponent
          chartType={tipoGrafico}
          chartData={chartData}
          tiposGraficos={tiposGraficos}
          onChangeType={setTipoGrafico}
        />
      )}

      {datos?.tabla && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-white">Datos Tabulares</h3>
          <TablaInteractiva
            columnas={Object.keys(datos.tabla[0] || {})}
            datos={datos.tabla}
          />
        </div>
      )}
    </div>
  );
}
