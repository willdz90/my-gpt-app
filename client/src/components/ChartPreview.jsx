// src/components/ChartPreview.jsx

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ChartPreview({ widget }) {
  if (!widget || !widget.data || widget.data.length === 0) {
    return (
      <div className="p-4 text-sm italic text-zinc-500 border border-dashed rounded-lg">
        No hay datos para mostrar. Ejecuta una consulta o configura el widget.
      </div>
    );
  }

  const { data, tipoDeGrafico, config } = widget;
  const { x, y, z } = config || {};

  if (!x || !y) {
    return (
      <div className="p-4 text-sm italic text-red-500 border border-dashed rounded-lg">
        Configuración inválida del widget. Faltan claves X o Y.
      </div>
    );
  }

  const categoriasZ = z ? [...new Set(data.map((d) => d[z]))] : [];

  return (
    <div className="w-full h-80 bg-white dark:bg-zinc-900 border rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        {tipoDeGrafico === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={x} />
            <YAxis />
            <Tooltip />
            <Legend />
            {z
              ? categoriasZ.map((serie, i) => (
                  <Bar
                    key={i}
                    dataKey={(d) => d[z] === serie ? d[y] : null}
                    name={serie}
                    fill="currentColor"
                  />
                ))
              : <Bar dataKey={y} fill="currentColor" />}
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={x} />
            <YAxis />
            <Tooltip />
            <Legend />
            {z
              ? categoriasZ.map((serie, i) => (
                  <Line
                    key={i}
                    type="monotone"
                    dataKey={(d) => d[z] === serie ? d[y] : null}
                    name={serie}
                    stroke="currentColor"
                  />
                ))
              : <Line type="monotone" dataKey={y} stroke="currentColor" />}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
