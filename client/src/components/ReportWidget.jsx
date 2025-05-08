import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ReportWidget({
  id,
  title = 'Reporte',
  chartType = 'bar',
  data,
  columns = [],
  modoEditar = false,
  onClick,
  onDelete
}) {
  const tieneGrafico = data?.labels?.length > 1 && data?.datasets?.[0]?.data?.length > 1;

  return (
    <div
      onClick={!modoEditar ? onClick : undefined}
      className={`relative bg-white dark:bg-gray-800 rounded shadow border dark:border-gray-700 p-4 h-full w-full overflow-hidden ${
        modoEditar ? 'cursor-default' : 'cursor-pointer hover:ring-2 hover:ring-blue-400'
      }`}
    >
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</h3>

      {modoEditar && (
        <button
          onClick={() => onDelete(id)}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg font-bold z-10"
        >
          ×
        </button>
      )}

      <div className="w-full h-full flex justify-center items-center">
        <div
          className="relative"
          style={{
            width: '100%',
            height: '90%',
            minWidth: '250px',
            minHeight: '280px',
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '1.6'
          }}
        >
          {tieneGrafico ? (
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
            <div className="text-sm text-gray-500 dark:text-gray-300 overflow-x-auto mt-4">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr>
                    {columns.map(col => (
                      <th key={col.header} className="p-1 font-semibold">
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {columns.map(col => (
                      <td key={col.accessorKey} className="p-1">
                        {col.Cell()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
