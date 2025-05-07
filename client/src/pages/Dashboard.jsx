import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalAnalizados: 12,
    viables: 8,
    puntuacionMedia: 4.1,
    viablesRecientes: 3
  });

  const [rango, setRango] = useState(7);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const datosMock = Array.from({ length: rango }, (_, i) => ({
      fecha: `Día ${i + 1}`,
      puntuacion: Math.random() * 2 + 3,
      viable: Math.random() > 0.3
    }));
    setHistorial(datosMock);

    const viablesRecientes = datosMock.filter(d => d.viable).length;
    setMetrics(prev => ({
      ...prev,
      viablesRecientes
    }));
  }, [rango]);

  const porcentajeViables = ((metrics.viables / metrics.totalAnalizados) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-2xl font-bold text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Bienvenido de nuevo 👋
      </motion.h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Productos analizados" value={metrics.totalAnalizados} icon="📦" />
        <KpiCard title="% Viables" value={`${porcentajeViables}%`} icon="✅" />
        <KpiCard title="Puntuación promedio" value={`${metrics.puntuacionMedia} ⭐`} icon="📈" />
        <KpiCard title="Viables recientes" value={metrics.viablesRecientes} icon="🔥" />
      </div>

      {/* Filtro de rango */}
      <div className="flex items-center gap-4">
        <label className="text-gray-700 dark:text-gray-300 font-medium">Periodo:</label>
        {[7, 14, 30].map(d => (
          <button
            key={d}
            onClick={() => setRango(d)}
            className={`px-3 py-1 rounded ${
              rango === d ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Últimos {d} días
          </button>
        ))}
      </div>

      {/* Gráfico ajustado */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700 overflow-x-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ minWidth: `${rango * 80}px`, height: '250px' }}>
          <Chart
            type="line"
            data={{
              labels: historial.map(d => d.fecha),
              datasets: [
                {
                  label: 'Puntuación promedio',
                  data: historial.map(d => d.puntuacion.toFixed(2)),
                  fill: true,
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  borderColor: '#3B82F6'
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false }
              },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 0,
                    autoSkip: false
                  }
                },
                y: {
                  min: 0,
                  max: 5
                }
              }
            }}
          />
        </div>
      </motion.div>

      {/* Actividad reciente */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Actividad reciente</h2>
        <ul className="space-y-1 text-gray-700 dark:text-gray-300">
          {historial.slice(-5).reverse().map((item, idx) => (
            <li key={idx} className="border-b pb-1 text-sm">
              📦 Producto evaluado el {item.fecha}: {item.puntuacion.toFixed(2)} ⭐
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg border dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
