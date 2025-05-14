import { useState } from "react";

const METRICAS = {
  Generales: ["ventas", "productos", "usuarios"],
  Evaluaciones: ["calificacion", "comentarios", "reseñas"],
  Financieras: ["precio", "descuentos", "ingresos"],
  Tiempos: ["fecha", "hora", "duracion"],
  Categorización: ["categoria", "subcategoria", "marca"]
};

export default function MetricasSidebar({ onSeleccionar }) {
  const [seleccionadas, setSeleccionadas] = useState([]);

  const toggleMetrica = (metrica) => {
    const actualizadas = seleccionadas.includes(metrica)
      ? seleccionadas.filter((m) => m !== metrica)
      : [...seleccionadas, metrica];

    setSeleccionadas(actualizadas);
    if (onSeleccionar) onSeleccionar(actualizadas);
  };

  return (
    <div className="space-y-4 text-sm">
      {Object.entries(METRICAS).map(([categoria, metricas]) => (
        <div key={categoria}>
          <h4 className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">{categoria}</h4>
          <ul className="space-y-1">
            {metricas.map((metrica) => (
              <li key={metrica}>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seleccionadas.includes(metrica)}
                    onChange={() => toggleMetrica(metrica)}
                    className="accent-blue-500"
                  />
                  <span>{metrica}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
