import { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";

export default function Dashboard() {
  const [dataLine, setDataLine] = useState([]);

  useEffect(() => {
    // Simulación temporal de datos
    const simulatedData = [
      { fecha: "2025-05-01", analisis: 5 },
      { fecha: "2025-05-02", analisis: 6 },
      { fecha: "2025-05-03", analisis: 7 },
      { fecha: "2025-05-04", analisis: 4 },
      { fecha: "2025-05-05", analisis: 9 }
    ];
    setDataLine(simulatedData);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Panel Principal</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Análisis Recientes</h2>
        <ChartComponent data={dataLine} />
      </div>
    </div>
  );
}
