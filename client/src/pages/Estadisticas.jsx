// src/pages/Estadisticas.jsx
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useNavigate } from 'react-router-dom';
import ReportWidget from '../components/ReportWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Estadisticas() {
  const [modoEditar, setModoEditar] = useState(false);
  const [layouts, setLayouts] = useState([
    { i: 'reporte1', x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'reporte2', x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 4 }
  ]);
  const navigate = useNavigate();

  const reportes = {
    reporte1: {
      title: 'Análisis semanal',
      chartType: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue'],
        datasets: [{
          label: 'Pedidos',
          data: [5, 8, 6, 9],
          backgroundColor: '#3B82F6'
        }]
      }
    },
    reporte2: {
      title: 'Promedios por criterio',
      chartType: 'radar',
      data: {
        labels: ['Wow', 'Viralidad', 'Logística', 'Rentabilidad', 'Contenido'],
        datasets: [{
          label: 'Promedios',
          data: [4.2, 3.8, 3.5, 4.1, 4.0],
          backgroundColor: 'rgba(59,130,246,0.4)',
          borderColor: '#3B82F6',
          borderWidth: 1
        }]
      }
    }
  };

  const handleAgregar = () => {
    const id = `reporte${layouts.length + 1}`;
    const nuevo = {
      i: id,
      x: 0,
      y: Infinity,
      w: 6,
      h: 5,
      minW: 4,
      minH: 4
    };
    setLayouts(prev => [...prev, nuevo]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Informes y estadísticas</h1>
        <div className="space-x-3">
          <button
            onClick={handleAgregar}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Agregar reporte
          </button>
          <button
            onClick={() => setModoEditar(!modoEditar)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {modoEditar ? 'Salir de edición' : 'Personalizar'}
          </button>
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layouts }}
        breakpoints={{ lg: 1024, md: 768, sm: 480 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        rowHeight={80}
        isDraggable={modoEditar}
        isResizable={modoEditar}
        resizeHandles={modoEditar ? ['se'] : []}
        margin={[16, 16]}
        useCSSTransforms={true}
      >
        {layouts.map(({ i }) => (
          <div key={i} style={{ minWidth: 300, minHeight: 280 }}>
            <ReportWidget
              id={i}
              title={reportes[i]?.title}
              chartType={reportes[i]?.chartType}
              data={reportes[i]?.data}
              onClick={() => {
                if (!modoEditar) navigate(`/reporte/${i}`);
              }}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
