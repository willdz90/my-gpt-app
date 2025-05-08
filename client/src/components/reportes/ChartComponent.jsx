import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ChartComponent({ chartType = 'bar', chartData = {}, tiposGraficos = [], onChangeType }) {
  const tieneDatos = chartData?.datasets?.[0]?.data?.length > 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 min-h-[300px]">
      {tieneDatos && tiposGraficos.length > 0 ? (
        <>
          <select
            className="mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={chartType}
            onChange={(e) => onChangeType(e.target.value)}
          >
            {tiposGraficos.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <Chart
            type={chartType}
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No hay datos numéricos suficientes para mostrar un gráfico.
        </p>
      )}
    </div>
  );
}
