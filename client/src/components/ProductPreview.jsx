import { useState } from 'react';

export default function ProductPreview({ product }) {
  if (!product || !product.nombre || !product.imagenes?.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center text-gray-500 dark:text-gray-300 h-full flex flex-col justify-center items-center rounded-lg shadow-inner">
        <span className="text-2xl">🧪</span>
        <p className="mt-3 text-sm">Aún no has ingresado datos para previsualizar.</p>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);

  const caracteristicas = product.caracteristicas
    ?.split(/[\n,]+/)
    .map((c) => c.trim())
    .filter(Boolean);

  const diferenciadores = product.puntos_venta
    ?.split(/[\n,]+/)
    .map((d) => d.trim())
    .filter(Boolean);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg transition-all">
      {/* Cabecera con nombre y precio */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {product.nombre}
        </h2>
        <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${product.precio_esperado}
        </span>
      </div>

      {/* Imagen principal */}
      <div className="mb-4 flex justify-center">
        <img
          src={URL.createObjectURL(product.imagenes[selectedImage])}
          alt={`Imagen ${selectedImage + 1}`}
          className="max-h-64 w-full object-contain rounded-lg border border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 overflow-x-auto sm:overflow-visible mb-6">
        {product.imagenes.map((img, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(img)}
            alt={`Miniatura ${idx + 1}`}
            onClick={() => setSelectedImage(idx)}
            className={`h-14 w-14 object-cover rounded border cursor-pointer transition ${
              selectedImage === idx
                ? 'ring-2 ring-blue-500'
                : 'opacity-70 hover:opacity-100'
            }`}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="space-y-4 text-sm sm:text-base">
        {product.descripcion && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-zinc-300">📝 Descripción</h3>
            <p className="text-gray-800 dark:text-gray-200">{product.descripcion}</p>
          </div>
        )}

        {caracteristicas?.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-zinc-300">🔧 Características</h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
              {caracteristicas.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {diferenciadores?.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-zinc-300">✨ Diferenciadores</h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
              {diferenciadores.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}

        {product.target && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-zinc-300">🎯 Público objetivo</h3>
            <p className="text-gray-800 dark:text-gray-200">{product.target}</p>
          </div>
        )}

        {product.proveedor && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-zinc-300">🚚 Proveedor</h3>
            <p className="text-gray-800 dark:text-gray-200">{product.proveedor}</p>
          </div>
        )}

        {product.precio_proveedor && (
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-zinc-300">💰 Precio proveedor</h3>
            <p className="text-gray-800 dark:text-gray-200">${product.precio_proveedor}</p>
          </div>
        )}
      </div>
    </div>
  );
}
