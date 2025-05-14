import { useState, useEffect } from "react";

export function useWidgetQuery({ columnas, filtros = {}, metricas = [] }) {
  const [queryVisible, setQueryVisible] = useState("");
  const [query, setQuery] = useState({});
  const [datos, setDatos] = useState([]);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [z, setZ] = useState(null);

  useEffect(() => {
    if (!columnas || columnas.length < 2) return;

    const [colX, colY, colZ] = columnas;
    setX(colX);
    setY(colY);
    setZ(colZ || null);

    const nuevaQuery = {
      columnas,
      metricaPrincipal: colY,
      agrupacion: colZ || colX,
      filtros
    };

    setQuery(nuevaQuery);

    const visible = `SELECT ${columnas.join(", ")} FROM analisis` +
      (Object.keys(filtros).length
        ? ` WHERE ${Object.entries(filtros)
            .map(([k, v]) => Array.isArray(v) ? `${k} IN (${v.join(", ")})` : `${k} = ${v}`)
            .join(" AND ")}`
        : "");

    setQueryVisible(visible);
  }, [columnas, filtros, metricas]);

  const ejecutar = async () => {
    try {
      const res = await fetch("/api/query/ejecutar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
      });
      const json = await res.json();
      if (json.success) setDatos(json.data);
    } catch (err) {
      console.error("Error al ejecutar query:", err);
    }
  };

  return {
    query,
    queryVisible,
    datos,
    x, y, z,
    ejecutar
  };
}
