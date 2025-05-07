import { useState, useRef } from 'react';
import { toast } from 'react-toastify';

export default function ProductForm({ formData = {}, setFormData, onSubmit, onReset }) {
  const [modoBasico, setModoBasico] = useState(false);
  const [errorPrecio, setErrorPrecio] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
  
    if (type === 'checkbox') {
      if (name === 'modoBasico') {
        setModoBasico(checked);
      }
      return;
    }
  
    if (name === 'imagenes') {
      const newFiles = Array.from(files);
      if (newFiles.length > 6) {
        toast.error('Solo se permiten hasta 6 imágenes.');
        e.target.value = '';
        return;
      }
      setFormData({ ...formData, imagenes: newFiles });
      return;
    }
  
    const updatedData = { ...formData, [name]: value };
  
    // Validación
    if (name === 'precio_esperado' || name === 'precio_proveedor') {
      const venta = parseFloat(name === 'precio_esperado' ? value : formData.precio_esperado);
      const proveedor = parseFloat(name === 'precio_proveedor' ? value : formData.precio_proveedor);
  
      if (!isNaN(venta) && !isNaN(proveedor)) {
        if (proveedor > venta) {
          setErrorPrecio(true);
          return toast.error('El precio del proveedor no puede ser mayor al precio de venta.');
        } else {
          setErrorPrecio(false);
        }
      }
    }
  
    setFormData(updatedData);
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      categoria: '',
      caracteristicas: '',
      precio_esperado: '',
      puntos_venta: '',
      target: '',
      idioma: 'es',
      proveedor: '',
      precio_proveedor: '',
      imagenes: []
    });
    setModoBasico(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onReset) onReset();
  };

  return (
    <div className="w-full space-y-6">
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        Puedes analizar un producto proporcionando toda su información relevante, incluyendo
        nombre, descripción, categoría, características, puntos de venta, público objetivo,
        proveedor, precios e imágenes. También puedes optar por un análisis básico si solo cuentas
        con el nombre del producto y sus imágenes. Selecciona el modo que mejor se ajuste a tu caso.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 transition-all w-full"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Datos del Producto</h2>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="modoBasico"
            checked={modoBasico}
            onChange={handleChange}
          />
          <label htmlFor="modoBasico" className="text-sm text-gray-700 dark:text-gray-300">
            Solo tengo nombre e imagen
          </label>
        </div>

        <input
          name="nombre"
          placeholder="Nombre *"
          value={formData.nombre || ''}
          onChange={handleChange}
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          required
        />

        {!modoBasico && (
          <>
            <textarea
              name="descripcion"
              placeholder="Descripción *"
              rows="2"
              value={formData.descripcion || ''}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
              required
            />

            <input
              name="categoria"
              placeholder="Categoría"
              value={formData.categoria || ''}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            <textarea
              name="caracteristicas"
              placeholder="Características (una por línea o separadas por comas)"
              rows="2"
              value={formData.caracteristicas || ''}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            <textarea
              name="puntos_venta"
              placeholder="Puntos de venta / Diferenciadores"
              rows="2"
              value={formData.puntos_venta || ''}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            <input
              name="target"
              placeholder="Público objetivo"
              value={formData.target || ''}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="precio_esperado"
            placeholder="Precio estimado de venta (USD) *"
            value={formData.precio_esperado || ''}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            name="proveedor"
            placeholder="Proveedor / País de origen *"
            value={formData.proveedor || ''}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="precio_proveedor"
            placeholder="Precio proveedor (opcional)"
            value={formData.precio_proveedor || ''}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          {/* {errorPrecio && (
            <p className="text-sm text-red-500 mt-1">
              El precio del proveedor no puede ser mayor que el precio estimado de venta.
            </p>
          )} */}
          <select
            name="idioma"
            value={formData.idioma || 'es'}
            onChange={handleChange}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Imágenes del producto * (máx. 6)
          </label>
          <input
            type="file"
            name="imagenes"
            accept="image/*"
            multiple
            onChange={handleChange}
            ref={fileInputRef}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={errorPrecio}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
              errorPrecio ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Analizar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
