import React, { useState } from "react";

const camposDisponibles = [
  { label: "Clasificación", value: "clasificacion" },
  { label: "Puntaje", value: "puntaje" },
  { label: "Categoría", value: "categoria" },
  { label: "Proveedor", value: "proveedor" }
];

const metricasDisponibles = [
  { label: "Promedio de Puntaje", value: "puntaje" },
  // Se pueden añadir más en el futuro
];

export default function QueryBuilder({ onEjecutar, loading }) {
  const [agrupacion, setAgrupacion] = useState("clasificacion");
  const [metrica, setMetrica] = useState("puntaje");
  const [filtros, setFiltros] = useState({});

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor === "todos" ? [] : [valor]
    }));
  };

  const ejecutar = () => {
    const columnas = [agrupacion, metrica];
    onEjecutar({ columnas, agrupacion, metrica, filtros });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Configura tu reporte</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Agrupar por</label>
          <select
            className="mt-1 w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            value={agrupacion}
            onChange={(e) => setAgrupacion(e.target.value)}
          >
            {camposDisponibles.map(campo => (
              <option key={campo.value} value={campo.value}>{campo.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Métrica</label>
          <select
            className="mt-1 w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            value={metrica}
            onChange={(e) => setMetrica(e.target.value)}
          >
            {metricasDisponibles.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">Filtrar por clasificación</label>
        <select
          className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          onChange={(e) => handleFiltroChange("clasificacion", e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="positivo">Positivo</option>
          <option value="neutro">Neutro</option>
          <option value="negativo">Negativo</option>
        </select>
      </div>

      <button
        onClick={ejecutar}
        disabled={loading}
        className="mt-4 px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {loading ? "Ejecutando..." : "Ejecutar Consulta"}
      </button>
    </div>
  );
}
