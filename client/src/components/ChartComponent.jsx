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
  const ChartElement = tipo === "barra" ? (
    <Bar dataKey={dataKey} fill="#8884d8" />
  ) : tipo === "área" ? (
    <Area dataKey={dataKey} stroke="#8884d8" fill="#d0d0ff" />
  ) : (
    <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
  );

  return (
    <ResponsiveContainer width="100%" height={250}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        {ChartElement}
      </Chart>
    </ResponsiveContainer>
  );
}
