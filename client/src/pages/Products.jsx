// src/pages/Products.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnalisis } from "../services/product.service";
import ExportModal from "../components/ExportModal";
import FilterDropdown from "../components/FilterDropdown";
import ColumnSettingsModal from "../components/ColumnSettingsModal";
import {
  ArrowDownTrayIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [mostrarExportModal, setMostrarExportModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [proveedorFiltro, setProveedorFiltro] = useState("Todos");
  const [clasificacionFiltro, setClasificacionFiltro] = useState("Todos");
  const [puntajeFiltro, setPuntajeFiltro] = useState("Todos");
  const [orden, setOrden] = useState({ campo: "fecha", asc: false });
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarDatos = () => {
    getAnalisis().then(res => {
      if (res.success) setProductos(res.data || []);
    });
  };

  useEffect(() => {
    cargarDatos();

    // ✅ Recargar productos si el token fue renovado
    const listener = () => cargarDatos();
    window.addEventListener("token_refreshed", listener);

    return () => {
      window.removeEventListener("token_refreshed", listener);
    };
  }, []);

  useEffect(() => {
    getAnalisis().then(res => {
      if (res.success) setProductos(res.data || []);
    });
  }, []);

  const ordenClasificacion = { positivo: 1, neutro: 2, negativo: 3 };

  const productosFiltrados = useMemo(() => {
    return productos
      .filter(p => p.input?.toLowerCase().includes(buscar.toLowerCase()))
      .filter(p => categoriaFiltro === "Todos" || p.categoria === categoriaFiltro)
      .filter(p => proveedorFiltro === "Todos" || p.proveedor === proveedorFiltro)
      .filter(p => clasificacionFiltro === "Todos" || p.clasificacion === clasificacionFiltro)
      .filter(p => puntajeFiltro === "Todos" || Math.round(p.puntaje / 20) >= Number(puntajeFiltro))
      .sort((a, b) => {
        const dir = orden.asc ? 1 : -1;
        if (orden.campo === "fecha") return (new Date(a.fecha) - new Date(b.fecha)) * dir;
        if (orden.campo === "puntaje") return (a.puntaje - b.puntaje) * dir;
        if (orden.campo === "input") return a.input.localeCompare(b.input) * dir;
        if (orden.campo === "precio") return ((a.precio || 0) - (b.precio || 0)) * dir;
        if (orden.campo === "proveedor") return (a.proveedor || "").localeCompare(b.proveedor || "") * dir;
        if (orden.campo === "categoria") return (a.categoria || "").localeCompare(b.categoria || "") * dir;
        if (orden.campo === "clasificacion") {
          return (ordenClasificacion[a.clasificacion] - ordenClasificacion[b.clasificacion]) * dir;
        }
        return 0;
      });
  }, [productos, buscar, categoriaFiltro, proveedorFiltro, clasificacionFiltro, puntajeFiltro, orden]);

  const paginaActual = productosFiltrados.slice(offset, offset + 15);

  const toggleSeleccionado = id => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSeleccionTodos = () => {
    const visibles = paginaActual.map(p => p._id);
    const todosSeleccionados = visibles.every(id => seleccionados.includes(id));
    setSeleccionados(todosSeleccionados
      ? seleccionados.filter(id => !visibles.includes(id))
      : [...new Set([...seleccionados, ...visibles])]
    );
  };

  const cambiarOrden = campo => {
    setOrden(prev => ({
      campo,
      asc: prev.campo === campo ? !prev.asc : true,
    }));
  };

  const exportarCSV = () => setMostrarExportModal(true);

  const procesarExportacion = async (opcion) => {
    setMostrarExportModal(false);
    let datos = [];

    if (opcion === "todos") {
      const res = await getAnalisis();
      if (res.success) datos = res.data;
    } else if (opcion === "seleccionados") {
      datos = productos.filter(p => seleccionados.includes(p._id));
    } else if (opcion === "pagina") {
      datos = paginaActual;
    }

    if (!datos.length) return alert("No hay productos para exportar.");

    const csv = [
      ["Producto", "Clasificación", "Puntaje", "Precio", "Proveedor", "Categoría", "Fecha"],
      ...datos.map(p => [
        `"${p.input}"`,
        p.clasificacion,
        (p.puntaje / 20).toFixed(1),
        p.precio || "-",
        p.proveedor || "-",
        p.categoria || "-",
        new Date(p.fecha).toLocaleDateString(),
      ]),
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "productos.csv";
    link.click();
  };

  const renderTipo = tipo => {
    const map = {
      positivo: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-white",
      negativo: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-white",
      neutro: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${map[tipo] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white"}`}>
        {tipo || "—"}
      </span>
    );
  };

  const flechaOrden = campo => {
    if (orden.campo !== campo) return null;
    return orden.asc ? <ArrowUpIcon className="w-4 h-4 inline ml-1" /> : <ArrowDownIcon className="w-4 h-4 inline ml-1" />;
  };

  return (
    <div className="space-y-6 p-6 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Mis análisis</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={buscar}
            onChange={e => setBuscar(e.target.value)}
            className="border px-3 py-1.5 rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => setIsModalOpen(true)} className="btn dark:bg-zinc-700 dark:hover:bg-zinc-600">
            Personalizar
          </button>
          <button onClick={exportarCSV} className="btn dark:bg-zinc-700 dark:hover:bg-zinc-600">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exportar CSV
          </button>
          <button onClick={() => navigate("/analizar")} className="btn bg-blue-600 hover:bg-blue-700 text-white">
            <PlusIcon className="h-4 w-4" />
            Nuevo análisis
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap mt-4">
        <FilterDropdown label="Categoría" options={["Todos", ...new Set(productos.map(p => p.categoria).filter(Boolean))]} value={categoriaFiltro} onChange={setCategoriaFiltro} />
        <FilterDropdown label="Proveedor" options={["Todos", ...new Set(productos.map(p => p.proveedor).filter(Boolean))]} value={proveedorFiltro} onChange={setProveedorFiltro} />
        <FilterDropdown label="Clasificación" options={["Todos", "positivo", "negativo", "neutro"]} value={clasificacionFiltro} onChange={setClasificacionFiltro} />
        <FilterDropdown label="Puntaje mínimo" options={["Todos", "1", "2", "3", "4", "5"]} value={puntajeFiltro} onChange={setPuntajeFiltro} />
      </div>

      <div className="overflow-auto rounded shadow border dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="p-3 w-6">
                <input
                  type="checkbox"
                  checked={paginaActual.every(p => seleccionados.includes(p._id))}
                  onChange={toggleSeleccionTodos}
                />
              </th>
              {[
                { id: "input", label: "Producto" },
                { id: "clasificacion", label: "Clasificación" },
                { id: "puntaje", label: "Puntaje" },
                { id: "precio", label: "Precio" },
                { id: "proveedor", label: "Proveedor" },
                { id: "categoria", label: "Categoría" },
                { id: "fecha", label: "Fecha" },
              ].map(col =>
                (columnVisibility[col.id] !== false || col.id === "input") && (
                  <th key={col.id} className="p-3 text-left cursor-pointer" onClick={() => cambiarOrden(col.id)}>
                    {col.label} {flechaOrden(col.id)}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginaActual.map(prod => (
              <tr key={prod._id} onClick={() => navigate(`/products/${prod._id}`)} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition">
                <td className="p-3" onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={seleccionados.includes(prod._id)}
                    onChange={() => toggleSeleccionado(prod._id)}
                  />
                </td>
                {columnVisibility.input !== false && <td className="p-3 font-medium text-gray-900 dark:text-white">{prod.input}</td>}
                {columnVisibility.clasificacion !== false && <td className="p-3">{renderTipo(prod.clasificacion)}</td>}
                {columnVisibility.puntaje !== false && <td className="p-3">{(prod.puntaje / 20).toFixed(1)}</td>}
                {columnVisibility.precio !== false && <td className="p-3">{prod.precio || "-"}</td>}
                {columnVisibility.proveedor !== false && <td className="p-3">{prod.proveedor || "-"}</td>}
                {columnVisibility.categoria !== false && <td className="p-3">{prod.categoria || "-"}</td>}
                {columnVisibility.fecha !== false && <td className="p-3 text-xs text-gray-500 dark:text-gray-300">{new Date(prod.fecha).toLocaleDateString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center px-2">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Mostrando {Math.min(offset + 1, productosFiltrados.length)}–{Math.min(offset + 15, productosFiltrados.length)} de {productosFiltrados.length} productos
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setOffset(prev => Math.max(prev - 15, 0))} disabled={offset === 0} className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30">
              <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Página {Math.floor(offset / 15) + 1}</span>
            <button onClick={() => offset + 15 < productosFiltrados.length && setOffset(offset + 15)} disabled={offset + 15 >= productosFiltrados.length} className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30">
              <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      <ColumnSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columns={[
          { id: "input", label: "Producto" },
          { id: "clasificacion", label: "Clasificación" },
          { id: "puntaje", label: "Puntaje" },
          { id: "precio", label: "Precio" },
          { id: "proveedor", label: "Proveedor" },
          { id: "categoria", label: "Categoría" },
          { id: "fecha", label: "Fecha" },
        ]}
        visibility={columnVisibility}
        onChange={setColumnVisibility}
      />

      <ExportModal
        isOpen={mostrarExportModal}
        onClose={() => setMostrarExportModal(false)}
        onSelect={procesarExportacion}
      />
    </div>
  );
}