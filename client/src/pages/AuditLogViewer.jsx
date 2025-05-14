import { useEffect, useState } from "react";
import { getLogs, getHttpMethods } from "../services/audit.service";
import ExportModal from "../components/ExportModal";
import ColumnSettingsModal from "../components/ColumnSettingsModal";
import FilterDropdown from "../components/FilterDropdown";
import { ArrowDownTrayIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const COLUMN_STORAGE_KEY = "audit_column_visibility";

export default function AuditLogViewer() {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [seleccionados, setSeleccionados] = useState([]);
  const [filters, setFilters] = useState({ user: "", method: "", route: "" });
  const [metodosUnicos, setMetodosUnicos] = useState([]);
  const [mostrarExportModal, setMostrarExportModal] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const columnas = [
    { id: "usuario", label: "Usuario", campo: null, fijo: true },
    { id: "metodo", label: "Método", campo: "method" },
    { id: "ruta", label: "Ruta", campo: "route" },
    { id: "codigo", label: "Código", campo: "statusCode" },
    { id: "ip", label: "IP", campo: "ip" },
    { id: "duracion", label: "Duración", campo: "duration" },
    { id: "fecha", label: "Fecha", campo: "timestamp" }
  ];

  useEffect(() => {
    const stored = localStorage.getItem(COLUMN_STORAGE_KEY);
    if (stored) setColumnVisibility(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const fetchLogs = async () => {
    setLoading(true);
    const res = await getLogs({
      page,
      limit,
      filters
    });
    if (res.success) {
      setLogs(res.logs || []);
      setTotal(res.total || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  useEffect(() => {
    getHttpMethods().then(m =>
      setMetodosUnicos([{ value: "", label: "Todos" }, ...m.map(x => ({ value: x, label: x }))])
    );
  }, []);

  const cambiarFiltro = (campo) => (e) => {
    setPage(1);
    setFilters(prev => ({ ...prev, [campo]: e.target.value }));
  };

  const toggleSeleccionado = id => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSeleccionTodos = () => {
    const visibles = logs.map(p => p._id);
    const todosSeleccionados = visibles.every(id => seleccionados.includes(id));
    setSeleccionados(todosSeleccionados
      ? seleccionados.filter(id => !visibles.includes(id))
      : [...new Set([...seleccionados, ...visibles])]
    );
  };

  const procesarExportacion = async (opcion) => {
    setMostrarExportModal(false);
    let datos = [];

    if (opcion === "todos") {
      const res = await getLogs({ limit: 10000 });
      datos = res.logs || [];
    } else if (opcion === "seleccionados") {
      const res = await getLogs({ filters: { ids: seleccionados.join(",") } });
      datos = res.logs || [];
    } else if (opcion === "pagina") {
      const res = await getLogs({ page, limit });
      datos = res.logs || [];
    }

    if (!datos.length) return alert("No hay datos para exportar.");

    const csv = [
      ["Usuario", "Método", "Ruta", "Código", "Duración", "IP", "Fecha"],
      ...datos.map(l => [
        l.user?.email || "-",
        l.method,
        l.route,
        l.statusCode,
        l.duration,
        l.ip,
        new Date(l.timestamp).toLocaleString(),
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "logs.csv";
    link.click();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 p-6 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Logs de Auditoría</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={filters.user}
            onChange={cambiarFiltro("user")}
            className="border px-3 py-1.5 rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <div className="min-w-[120px]">
            <FilterDropdown
              options={metodosUnicos}
              value={filters.method}
              onChange={(val) => setFilters(f => ({ ...f, method: val }))}
            />
          </div>
          <input
            type="text"
            placeholder="Ruta contiene..."
            value={filters.route}
            onChange={cambiarFiltro("route")}
            className="border px-3 py-1.5 rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <button onClick={() => setIsModalOpen(true)} className="btn dark:bg-zinc-700 dark:hover:bg-zinc-600">
            <Cog6ToothIcon className="h-4 w-4" />
            Personalizar
          </button>
          <button onClick={() => setMostrarExportModal(true)} className="btn dark:bg-zinc-700 dark:hover:bg-zinc-600">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded shadow border dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="p-3 w-6">
                <input
                  type="checkbox"
                  checked={logs.every(p => seleccionados.includes(p._id))}
                  onChange={toggleSeleccionTodos}
                />
              </th>
              {columnas.map(col =>
                (col.fijo || columnVisibility[col.id] !== false) && (
                  <th key={col.id} className="p-3 text-left">{col.label}</th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="p-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" /></td>
                  <td className="p-3" colSpan={7}><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" /></td>
                </tr>
              ))
            ) : (
              logs.map(log => (
                <tr key={log._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(log._id)}
                      onChange={() => toggleSeleccionado(log._id)}
                    />
                  </td>
                  <td className="p-3">{log.user?.email || "Anónimo"}</td>
                  {columnVisibility.metodo !== false && <td className="p-3">{log.method}</td>}
                  {columnVisibility.ruta !== false && <td className="p-3">{log.route}</td>}
                  {columnVisibility.codigo !== false && <td className="p-3">{log.statusCode}</td>}
                  {columnVisibility.ip !== false && <td className="p-3">{log.ip}</td>}
                  {columnVisibility.duracion !== false && <td className="p-3">{log.duration} ms</td>}
                  {columnVisibility.fecha !== false && <td className="p-3 text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center px-2">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Mostrando página {page} de {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30">←</button>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Página {page}</span>
            <button onClick={() => page < totalPages && setPage(p => p + 1)} disabled={page >= totalPages} className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30">→</button>
          </div>
        </div>
      </div>

      <ColumnSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columns={columnas.filter(c => !c.fijo).map(c => ({ id: c.id, label: c.label }))}
        visibility={columnVisibility}
        onChange={(vis) => {
          setColumnVisibility(vis);
          localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(vis));
        }}
      />

      <ExportModal
        isOpen={mostrarExportModal}
        onClose={() => setMostrarExportModal(false)}
        onSelect={procesarExportacion}
      />
    </div>
  );
}
