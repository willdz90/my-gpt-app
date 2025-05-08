// src/components/ChartComponent.jsx
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ChartComponent({ title, data, type = 'line' }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="w-full h-[300px]">
        <Chart
          type={type}
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
      </div>
    </div>
  );
}
