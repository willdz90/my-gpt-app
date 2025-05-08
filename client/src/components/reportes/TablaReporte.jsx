import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

export default function TablaReporte({ columns, columnOrder, setColumnOrder }) {
  const table = useMaterialReactTable({
    columns,
    data: [{}], // solo muestra estructura
    enableColumnOrdering: true,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder,
  });

  return <MaterialReactTable table={table} />;
}
