// src/components/ReportWidget.jsx
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ReportWidget({ title = 'Reporte', chartType = 'bar', data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded shadow border dark:border-gray-700 p-4 h-full w-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all overflow-hidden"
    >
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</h3>

      <div className="w-full h-full flex justify-center items-center">
        <div
          className="relative"
          style={{
            width: '100%',
            height: '90%',
            minWidth: '250px',
            minHeight: '280px', // ✅ ajustado para mejorar visibilidad vertical
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '1.6'
          }}
        >
          {data?.labels && data?.datasets ? (
            <Chart
              type={chartType}
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: 10 },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#111'
                    }
                  }
                }
              }}
            />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-300">Datos insuficientes</p>
          )}
        </div>
      </div>
    </div>
  );
}
