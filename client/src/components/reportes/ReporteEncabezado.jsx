import dayjs from 'dayjs';

export default function ReporteEncabezado({ nombre = '', fecha = new Date(), filtros = {} }) {
  const fechaFormateada = dayjs(fecha).format('DD MMMM YYYY HH:mm');

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-2">
      <div className="text-lg font-semibold dark:text-white">{nombre || 'Reporte personalizado'}</div>
      <div className="text-sm text-gray-500 dark:text-gray-300">Generado el {fechaFormateada}</div>
      {filtros && Object.keys(filtros).length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Filtros:</strong>{' '}
          {Object.entries(filtros).map(([key, value]) => `${key}: ${value}`).join(', ')}
        </div>
      )}
    </div>
  );
}
