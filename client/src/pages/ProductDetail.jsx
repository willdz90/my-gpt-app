// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import mockResults from '../mocks/mockResults'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Simulación temporal con datos mock
  const producto = {
    id,
    nombre: 'Producto simulado',
    tipo: 'positivo',
    precio: 25,
    categoria: 'Tecnología',
    proveedor: 'AliExpress',
    fecha: '2025-05-01',
    resultado: mockResults.positivo
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Botón de regreso */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver a productos
        </button>
      </div>

      {/* Detalles del producto */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{producto.nombre}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Categoría:</p>
            <p className="text-gray-900 dark:text-white">{producto.categoria}</p>
          </div>
          <div>
            <p className="text-gray-500">Proveedor:</p>
            <p className="text-gray-900 dark:text-white">{producto.proveedor}</p>
          </div>
          <div>
            <p className="text-gray-500">Precio:</p>
            <p className="text-gray-900 dark:text-white">${producto.precio}</p>
          </div>
          <div>
            <p className="text-gray-500">Fecha:</p>
            <p className="text-gray-900 dark:text-white">{producto.fecha}</p>
          </div>
        </div>

        {/* Resultado del análisis */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Resultado del análisis</h3>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{producto.resultado.veredicto}</p>
          <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">{producto.resultado.recomendacion}</p>
        </div>
      </div>
    </div>
  )
}
