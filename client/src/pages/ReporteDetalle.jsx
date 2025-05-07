// src/pages/ReporteDetalle.jsx
import { useNavigate } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ReporteDetalle() {
  const navigate = useNavigate();

  const data = {
    labels: ['Wow', 'Viralidad', 'Logística', 'Rentabilidad', 'Contenido'],
    datasets: [{
      label: 'Promedios',
      data: [4.2, 3.8, 3.5, 4.1, 4.0],
      backgroundColor: 'rgba(59,130,246,0.6)',
      borderColor: '#3B82F6',
      borderWidth: 1
    }]
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Cuerpo central */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex justify-between items-center">
          <input
            defaultValue="Promedios por criterio"
            className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none w-full"
          />
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Volver
          </button>
        </div>

        <input
          type="text"
          defaultValue="SELECT promedio FROM analisis WHERE semana = 'actual'"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 h-[300px]">
          <Chart type="radar" data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left mt-4">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-2">Criterio</th>
                <th className="p-2">Promedio</th>
              </tr>
            </thead>
            <tbody>
              {data.labels.map((label, idx) => (
                <tr key={label} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-2">{label}</td>
                  <td className="p-2">{data.datasets[0].data[idx]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar derecha */}
      <aside className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow border dark:border-gray-700">
        <h3 className="font-bold text-gray-800 dark:text-white mb-2">Campos seleccionados</h3>
        <ul className="text-sm space-y-1 mb-4">
          <li>✔ Wow</li>
          <li>✔ Viralidad</li>
          <li>✔ Rentabilidad</li>
        </ul>
        <hr className="my-2 border-gray-300 dark:border-gray-600" />
        <h4 className="font-semibold text-gray-700 dark:text-gray-300">Agregar campos</h4>
        <div className="mt-2 space-y-2 text-sm">
          <label><input type="checkbox" /> Logística</label><br />
          <label><input type="checkbox" /> Contenido</label><br />
          <label><input type="checkbox" /> Competencia</label>
        </div>
      </aside>
    </div>
  );
}
