import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartComponent({ data, dataKey = "analisis", tipo = "línea" }) {
  const Chart = tipo === "barra" ? BarChart : tipo === "área" ? AreaChart : LineChart;
  const ChartElement =
    tipo === "barra" ? (
      <Bar dataKey={dataKey} fill="#60a5fa" />
    ) : tipo === "área" ? (
      <Area dataKey={dataKey} stroke="#60a5fa" fill="#bfdbfe" />
    ) : (
      <Line type="monotone" dataKey={dataKey} stroke="#60a5fa" />
    );

  return (
    <ResponsiveContainer width="100%" height={250}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" stroke="#94a3b8" />
        <YAxis />
        <Tooltip />
        {ChartElement}
      </Chart>
    </ResponsiveContainer>
  );
}
