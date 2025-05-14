export default function TablaInteractiva({ columnas, datos, onReordenar }) {
  const handleDragStart = (e, fromIndex) => {
    e.dataTransfer.setData("fromIndex", fromIndex);
  };

  const handleDrop = (e, toIndex) => {
    const fromIndex = parseInt(e.dataTransfer.getData("fromIndex"), 10);
    const nuevas = [...columnas];
    const [moved] = nuevas.splice(fromIndex, 1);
    nuevas.splice(toIndex, 0, moved);
    onReordenar(nuevas);
  };

  return (
    <div className="overflow-auto border rounded-lg dark:border-zinc-700">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {columnas.map((col, idx) => (
              <th
                key={col}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, idx)}
                className="bg-zinc-200 dark:bg-zinc-700 px-3 py-2 cursor-move text-left"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.slice(0, 6).map((fila, idx) => (
            <tr key={idx} className="even:bg-zinc-100 dark:even:bg-zinc-800">
              {columnas.map((col) => (
                <td key={col} className="px-3 py-2 border border-zinc-200 dark:border-zinc-700">
                  {fila[col] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
