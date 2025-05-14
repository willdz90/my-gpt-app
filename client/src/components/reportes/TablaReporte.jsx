export default function TablaReporte({ columns, columnOrder, setColumnOrder, data }) {
  const orderedColumns = columnOrder.map(id => columns.find(c => c.id === id) || { id, header: id });

  const handleDragStart = (e, fromIndex) => {
    e.dataTransfer.setData("fromIndex", fromIndex);
  };

  const handleDrop = (e, toIndex) => {
    const fromIndex = parseInt(e.dataTransfer.getData("fromIndex"), 10);
    const reordered = [...columnOrder];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setColumnOrder(reordered);
  };

  return (
    <div className="overflow-auto rounded border dark:border-zinc-600">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-700 text-left">
          <tr>
            {orderedColumns.map((col, idx) => (
              <th
                key={col.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, idx)}
                className="px-4 py-2 cursor-move"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((row, i) => (
            <tr key={i} className="even:bg-gray-50 dark:even:bg-zinc-800">
              {orderedColumns.map(col => (
                <td key={col.id} className="px-4 py-2 border-t dark:border-zinc-700">
                  {row[col.id] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
