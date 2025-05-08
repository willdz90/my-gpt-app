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
        setLayouts(res.data.layout || []);
      } catch (error) {
        console.error('Error al cargar el layout:', error);
      }
    };
    fetchLayout();
  }, []);

  const handleAgregar = () => {
    navigate('/reporte/nuevo');
  };

  const handleEliminar = async (id) => {
    const actualizado = layouts.filter(w => w.i !== id);
    setLayouts(actualizado);
    await saveLayout(actualizado);
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
        {layouts.map(widget => {
          const { i, title, chartType, campos = [], funciones = {} } = widget;

          const camposMock = {
            efectoWow: { label: 'Efecto Wow', valor: 4.2 },
            viralidad: { label: 'Viralidad', valor: 3.8 },
            logistica: { label: 'Logística', valor: 3.5 },
            contenido: { label: 'Contenido Orgánico', valor: 4.0 },
            precio: { label: 'Precio', valor: 23.5 },
            envios: { label: 'Envíos', valor: 1200 }
          };

          const columnas = campos.slice(0, 2).map(key => ({
            header: camposMock[key]?.label || key,
            accessorKey: key,
            Cell: () => camposMock[key]?.valor ?? '—'
          }));

          const data = {
            labels: campos.map(c => camposMock[c]?.label).filter(Boolean),
            datasets: [{
              label: 'Valores',
              data: campos.map(c => camposMock[c]?.valor).filter(Boolean),
              backgroundColor: '#3B82F6'
            }]
          };

          return (
            <div key={i} style={{ minWidth: 300, minHeight: 280 }}>
              <ReportWidget
                id={i}
                title={title}
                chartType={chartType}
                data={data}
                columns={columnas}
                modoEditar={modoEditar}
                onClick={() => {
                  if (!modoEditar) navigate(`/reporte/${i}`);
                }}
                onDelete={handleEliminar}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
}
