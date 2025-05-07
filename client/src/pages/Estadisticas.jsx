// src/pages/Estadisticas.jsx
import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useNavigate } from 'react-router-dom';
import ReportWidget from '../components/ReportWidget';
import axios from 'axios';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Estadisticas() {
  const [modoEditar, setModoEditar] = useState(false);
  const [layouts, setLayouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/users/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLayouts(res.data.layout);
      } catch (error) {
        console.error('Error al cargar el layout:', error);
      }
    };
    fetchLayout();
  }, []);

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
    const updatedLayouts = [...layouts, nuevo];
    setLayouts(updatedLayouts);
    saveLayout(updatedLayouts);
  };

  const saveLayout = async (layout) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/users/dashboard', { layout }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error al guardar el layout:', error);
    }
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
        onLayoutChange={(currentLayout) => {
          setLayouts(currentLayout);
          saveLayout(currentLayout);
        }}
      >
        {layouts.map(({ i }) => (
          <div key={i} style={{ minWidth: 300, minHeight: 280 }}>
            <ReportWidget
              id={i}
              title={`Reporte ${i}`}
              chartType="bar"
              data={{
                labels: ['Ene', 'Feb', 'Mar', 'Abr'],
                datasets: [{
                  label: 'Ventas',
                  data: [10, 20, 30, 40],
                  backgroundColor: '#3B82F6'
                }]
              }}
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
