import React from "react";
import { XIcon } from "lucide-react";

export default function SidebarPersonalizacion({
  columns = [],
  visibleColumns = [],
  onChange,
  onClose
}) {
  const [selected, setSelected] = React.useState([...visibleColumns]);

  const toggleColumn = (col) => {
    if (selected.includes(col)) {
      setSelected(selected.filter(c => c !== col));
    } else {
      setSelected([...selected, col]);
    }
  };

  const selectAll = () => setSelected([...columns]);
  const reset = () => setSelected([...visibleColumns]);
  const apply = () => onChange(selected);

  return (
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white dark:bg-zinc-900 shadow-2xl z-50 transition-all duration-300 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Personalizar tabla</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto px-5 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={selectAll} className="text-sm text-blue-600 hover:underline">
            Seleccionar todas
          </button>
          <button onClick={reset} className="text-sm text-gray-500 hover:underline">
            Restaurar
          </button>
        </div>

        <div className="space-y-2">
          {columns.map((col) => (
            <label key={col} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg shadow-sm border dark:border-zinc-700 hover:shadow-md transition">
              <span className="text-sm font-medium text-gray-700 dark:text-white">{col}</span>
              <input
                type="checkbox"
                checked={selected.includes(col)}
                onChange={() => toggleColumn(col)}
                className="accent-blue-600 h-4 w-4"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 border-t dark:border-zinc-700">
        <button
          onClick={apply}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md font-semibold transition"
        >
          Aplicar cambios
        </button>
      </div>
    </div>
  );
}
