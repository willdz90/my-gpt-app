import { useState } from "react";

const METRICAS = [
  { id: "totalAnalisis", nombre: "Total de análisis", tipo: "kpi" },
  { id: "positivos", nombre: "Evaluaciones positivas", tipo: "grafico" },
  { id: "negativos", nombre: "Evaluaciones negativas", tipo: "grafico" },
  { id: "falsosPositivos", nombre: "Falsos positivos", tipo: "tabla" },
  { id: "falsosNegativos", nombre: "Falsos negativos", tipo: "tabla" },
  { id: "aciertos", nombre: "Aciertos", tipo: "grafico" }
];

const TIPOS_GRAFICO = ["línea", "barra", "área"];

export default function MetricasSidebar({ onAdd }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [tipoGrafico, setTipoGrafico] = useState("línea");

  return (
    <aside className="w-64 bg-zinc-100 dark:bg-zinc-800 border-l border-zinc-300 dark:border-zinc-700 p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-2">Métricas disponibles</h2>
      <ul className="space-y-2">
        {METRICAS.map((m) => (
          <li
            key={m.id}
            onClick={() => setSeleccionada(m)}
            className={`cursor-pointer p-2 rounded ${
              seleccionada?.id === m.id
                ? "bg-blue-600 text-white"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {m.nombre}
          </li>
        ))}
      </ul>

      {seleccionada && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-muted-foreground">Tipo: {seleccionada.tipo}</p>

          {seleccionada.tipo === "grafico" ? (
            <select
              className="w-full p-2 border rounded"
              value={tipoGrafico}
              onChange={(e) => setTipoGrafico(e.target.value)}
            >
              {TIPOS_GRAFICO.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-xs italic text-red-600">Los datos no aplican para gráficos</p>
          )}

          <button
            className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            onClick={() => {
              onAdd({
                ...seleccionada,
                tipoGrafico: seleccionada.tipo === "grafico" ? tipoGrafico : null
              });
              setSeleccionada(null);
            }}
          >
            Agregar widget
          </button>
        </div>
      )}
    </aside>
  );
}
