import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../utils/axiosInstance';
import SidebarCampos from '../components/SidebarCampos';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const camposAgrupados = {
  'Evaluación del Producto': [
    { key: 'efectoWow', label: 'Efecto Wow', tipo: 'score', valor: 4.2 },
    { key: 'viralidad', label: 'Viralidad', tipo: 'score', valor: 3.8 },
    { key: 'logistica', label: 'Logística', tipo: 'score', valor: 3.5 },
    { key: 'contenido', label: 'Contenido Orgánico', tipo: 'score', valor: 4.0 }
  ],
  'Estadística Descriptiva': [
    { key: 'precio', label: 'Precio estimado', tipo: 'numero', valor: 23.5 },
    { key: 'envios', label: 'Cantidad de envíos', tipo: 'numero', valor: 1400 }
  ],
  'Datos del Producto': [
    { key: 'pais', label: 'País de venta', tipo: 'string', valor: 'USA' },
    { key: 'categoria', label: 'Categoría', tipo: 'categorico', valor: 'Salud' }
  ]
};

const funcionesEstadisticas = {
  score: ['media', 'moda', 'min', 'max'],
  numero: ['media', 'mediana', 'desviacionEstandar'],
  string: ['frecuencia'],
  categorico: ['frecuencia']
};

export default function ReporteDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'nuevo';

  const [title, setTitle] = useState('');
  const [chartType, setChartType] = useState('radar');
  const [camposSeleccionados, setCamposSeleccionados] = useState([]);
  const [funcionesSeleccionadas, setFuncionesSeleccionadas] = useState({});
  const [querySQL, setQuerySQL] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [columnOrder, setColumnOrder] = useState([]);

  const todosLosCampos = useMemo(() => Object.values(camposAgrupados).flat(), []);

  const datosGraficables = useMemo(() =>
    columnOrder.map(key =>
      todosLosCampos.find(c => c.key === key && (c.tipo === 'score' || c.tipo === 'numero'))
    ).filter(Boolean),
    [columnOrder, todosLosCampos]
  );

  const chartData = useMemo(() => ({
    labels: datosGraficables.map(c => c.label),
    datasets: [{
      label: 'Valor',
      data: datosGraficables.map(c => c.valor),
      backgroundColor: 'rgba(59,130,246,0.6)',
      borderColor: '#3B82F6',
      borderWidth: 1
    }]
  }), [datosGraficables]);

  const tiposGraficosPermitidos = useMemo(() =>
    datosGraficables.length >= 2 ? ['bar', 'radar', 'line'] : [],
    [datosGraficables]
  );

  useEffect(() => {
    if (camposSeleccionados.length === 0) return setQuerySQL('');
    const query = camposSeleccionados.map(key => {
      const fn = funcionesSeleccionadas[key];
      return fn ? `${fn}(${key})` : key;
    });
    setQuerySQL(`SELECT ${query.join(', ')} FROM analisis WHERE semana = 'actual'`);
  }, [camposSeleccionados, funcionesSeleccionadas]);

  useEffect(() => {
    if (!isNew) {
      api.get('/api/users/dashboard')
        .then(res => {
          const reporte = res.data.layout?.find(r => r.i === id);
          if (reporte) {
            setTitle(reporte.title || '');
            setChartType(reporte.chartType || 'radar');
            setCamposSeleccionados(reporte.campos || []);
            setFuncionesSeleccionadas(reporte.funciones || {});
          }
        })
        .catch(err => console.error('Error al cargar reporte:', err))
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const handleGuardar = useCallback(async () => {
    const nuevoWidget = {
      i: isNew ? `reporte_${Date.now()}` : id,
      x: 0,
      y: Infinity,
      w: 6,
      h: 5,
      title,
      chartType,
      campos: camposSeleccionados,
      funciones: funcionesSeleccionadas
    };

    try {
      const res = await api.get('/api/users/dashboard');
      const layout = res.data.layout || [];
      const actualizado = isNew
        ? [...layout, nuevoWidget]
        : layout.map(w => w.i === id ? { ...w, ...nuevoWidget } : w);
      await api.put('/api/users/dashboard', { layout: actualizado });
      navigate('/graficos');
    } catch (err) {
      console.error('Error al guardar reporte:', err);
    }
  }, [isNew, id, title, chartType, camposSeleccionados, funcionesSeleccionadas, navigate]);

  const columns = useMemo(() =>
    camposSeleccionados.map(key => {
      const campo = todosLosCampos.find(c => c.key === key);
      return {
        accessorKey: campo.key,
        header: campo.label,
        Cell: () => campo.valor
      };
    }), [camposSeleccionados, todosLosCampos]);

  useEffect(() => {
    setColumnOrder(columns.map(col => col.accessorKey));
  }, [columns]);

  const table = useMaterialReactTable({
    columns,
    data: [{}],
    enableColumnOrdering: true,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder
  });

  if (loading) return <div className="p-6 text-gray-700 dark:text-white">Cargando reporte...</div>;

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        {/* ToolbarReporte */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title || 'Nuevo reporte'}</h1>
            <div className="flex space-x-3">
              <button onClick={() => navigate(-1)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">← Volver</button>
              <button onClick={handleGuardar} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Guardar reporte</button>
            </div>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del reporte"
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* QueryPreview */}
        {/* <textarea
          value={querySQL}
          readOnly
          className="w-full px-3 py-2 font-mono border rounded resize-none bg-white dark:bg-gray-800 dark:text-white"
          rows={1}
          onFocus={(e) => e.target.rows = 5}
          onBlur={(e) => e.target.rows = 1}
        /> */}

        {/* ChartComponent */}
        {/* <div className="bg-white dark:bg-gray-800 rounded shadow p-4 min-h-[300px]">
          {chartData?.datasets?.[0]?.data?.length > 1 && tiposGraficosPermitidos.length > 0 ? (
            <>
              <select
                className="mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                {tiposGraficosPermitidos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
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
        </div> */}

        {/* TablaReporte */}
        {/* <MaterialReactTable table={table} /> */}
      </div>

      {/* SidebarCampos */}
      {/* <SidebarCampos
        camposAgrupados={camposAgrupados}
        camposSeleccionados={camposSeleccionados}
        setCamposSeleccionados={setCamposSeleccionados}
        funcionesAplicables={funcionesEstadisticas}
        funcionesSeleccionadas={funcionesSeleccionadas}
        setFuncionesSeleccionadas={setFuncionesSeleccionadas}
      /> */}
    </div>
  );
}
