import { useState, useMemo } from 'react';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const mockProducts = [
  {
    id: 1,
    nombre: 'Producto en español',
    tipo: 'positivo',
    precio: 25,
    categoria: 'Tecnología',
    proveedor: 'Mi tienda',
    fecha: '2025-05-01',
  },
  {
    id: 2,
    nombre: 'Producto en inglés',
    tipo: 'negativo',
    precio: 30,
    categoria: 'Hogar',
    proveedor: 'AliExpress',
    fecha: '2025-05-03',
  },
  // ... más productos
];

export default function Products() {
  const [productos] = useState(mockProducts);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '', proveedor: '' });
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;
  const navigate = useNavigate();

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
    setPaginaActual(1); // Reiniciar a la primera página al aplicar un filtro
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((prod) => {
      const nombreMatch = prod.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      const categoriaMatch = filtros.categoria ? prod.categoria === filtros.categoria : true;
      const proveedorMatch = filtros.proveedor ? prod.proveedor === filtros.proveedor : true;
      return nombreMatch && categoriaMatch && proveedorMatch;
    });
  }, [productos, filtros]);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indiceInicio, indiceInicio + productosPorPagina);

  const toggleAll = () => {
    if (selectedIds.length === productos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(productos.map((p) => p.id));
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderTipo = (tipo) => {
    const colors = {
      positivo: 'bg-green-200 text-green-800',
      neutro: 'bg-yellow-100 text-yellow-700',
      negativo: 'bg-red-200 text-red-800',
    };
    return <span className={`px-2 py-1 text-xs rounded font-medium ${colors[tipo]}`}>{tipo}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📦 Productos Analizados</h1>
        <div className="flex gap-2">
          <button
            onClick={() => alert('Exportando CSV...')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded text-sm flex items-center gap-1 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exportar CSV
          </button>
          <button
            onClick={() => navigate('/analizar')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Nuevo análisis
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          name="nombre"
          value={filtros.nombre}
          onChange={handleFiltroChange}
          placeholder="Buscar por nombre"
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white"
        />
        <select
          name="categoria"
          value={filtros.categoria}
          onChange={handleFiltroChange}
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Todas las categorías</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Hogar">Hogar</option>
          {/* Agrega más opciones según tus categorías */}
        </select>
        <select
          name="proveedor"
          value={filtros.proveedor}
          onChange={handleFiltroChange}
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Todos los proveedores</option>
          <option value="Mi tienda">Mi tienda</option>
          <option value="AliExpress">AliExpress</option>
          {/* Agrega más opciones según tus proveedores */}
        </select>
      </div>

      <div className="overflow-auto rounded shadow border dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === productos.length}
                  onChange={toggleAll}
                />
              </th>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-left">Proveedor</th>
              <th className="p-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {productosPaginados.map((prod) => (
              <tr
                key={prod.id}
                onClick={() => navigate(`/products/${prod.id}`)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
              >
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(prod.id)}
                    onChange={() => toggleOne(prod.id)}
                  />
                </td>
                <td className="p-3 font-medium text-gray-900 dark:text-white">{prod.nombre}</td>
                <td className="p-3">{renderTipo(prod.tipo)}</td>
                <td className="p-3">${prod.precio}</td>
                <td className="p-3">{prod.categoria}</td>
                <td className="p-3">{prod.proveedor}</td>
                <td className="p-3 text-xs text-gray-500">{prod.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPaginaActual(i + 1)}
            className={`px-3 py-1.5 rounded ${
              paginaActual === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
