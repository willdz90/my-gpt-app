import { useEffect, useState } from 'react';

export default function SidebarCampos({
  camposAgrupados = {},
  camposSeleccionados = [],
  setCamposSeleccionados,
  funcionesAplicables = {},
  funcionesSeleccionadas = {},
  setFuncionesSeleccionadas
}) {
  const [localFunciones, setLocalFunciones] = useState(funcionesSeleccionadas || {});

  // Emitir funciones al padre cada vez que cambian localmente
  useEffect(() => {
    setFuncionesSeleccionadas(localFunciones);
  }, [localFunciones, setFuncionesSeleccionadas]);

  const toggleCampo = (campoKey) => {
    setCamposSeleccionados(prev =>
      prev.includes(campoKey)
        ? prev.filter(c => c !== campoKey)
        : [...prev, campoKey]
    );
  };

  const handleFuncionChange = (campoKey, funcion) => {
    setLocalFunciones(prev => ({
      ...prev,
      [campoKey]: funcion || undefined
    }));
  };

  return (
    <aside
      className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow border dark:border-gray-700 overflow-y-auto"
      style={{ maxHeight: '600px' }}
    >
      <h3 className="font-bold text-gray-800 dark:text-white mb-3">Selecciona campos</h3>

      {Object.entries(camposAgrupados).map(([grupo, campos]) => (
        <div key={grupo} className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{grupo}</h4>
          <div className="space-y-2">
            {campos.map(campo => (
              <div key={campo.key} className="flex items-center justify-between gap-2">
                <label className="flex items-center text-sm w-full">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={camposSeleccionados.includes(campo.key)}
                    onChange={() => toggleCampo(campo.key)}
                  />
                  {campo.label}
                </label>

                {funcionesAplicables[campo.tipo]?.length > 0 && camposSeleccionados.includes(campo.key) && (
                  <select
                    className="text-sm p-1 border rounded bg-white dark:bg-gray-800 dark:text-white"
                    value={localFunciones[campo.key] || ''}
                    onChange={(e) => handleFuncionChange(campo.key, e.target.value)}
                  >
                    <option value="">función</option>
                    {funcionesAplicables[campo.tipo].map(fn => (
                      <option key={fn} value={fn}>{fn}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
