import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ProductsTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSizing, setColumnSizing] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'input',
        header: 'Producto',
        size: 200,
        enableResizing: false, // No permitir redimensionar la primera columna
      },
      {
        accessorKey: 'clasificacion',
        header: 'Clasificación',
        size: 150,
      },
      {
        accessorKey: 'puntaje',
        header: 'Puntaje',
        size: 100,
        cell: info => (info.getValue() / 20).toFixed(1),
      },
      {
        accessorKey: 'precio',
        header: 'Precio',
        size: 100,
      },
      {
        accessorKey: 'proveedor',
        header: 'Proveedor',
        size: 150,
      },
      {
        accessorKey: 'categoria',
        header: 'Categoría',
        size: 150,
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
        size: 120,
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnSizing,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div>
      <button
        onClick={() =>
          setColumnVisibility(old => ({
            ...old,
            puntaje: !old.puntaje,
          }))
        }
      >
        Toggle Puntaje Column
      </button>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const canResize = header.column.getCanResize();
                return (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                          style: {
                            cursor: header.column.getCanSort()
                              ? 'pointer'
                              : 'default',
                          },
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                    {canResize && (
                      <div
                        {...header.column.getResizerProps()}
                        className={`resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;
