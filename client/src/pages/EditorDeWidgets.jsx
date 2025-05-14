// src/pages/EditorDeWidgets.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ejecutarConsulta } from "../services/query.service";
import { saveUserWidgets } from "../services/dashboard.service";
import ChartPreview from "../components/ChartPreview";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export default function EditorDeWidgets() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    metrica: "precio",
    tipoDeGrafico: "bar",
    dimension: "categoria",
    rangoFechas: {
      desde: dayjs().subtract(7, "day").toDate(),
      hasta: dayjs().toDate(),
    },
    opcionesAvanzadas: {
      agruparPor: "día",
      filtrosExtra: {},
    },
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPreview(null);
    setError("");
  };

  const handlePreview = async () => {
    setLoading(true);
    try {
      const result = await ejecutarConsulta(form);
      setPreview(result);
    } catch (err) {
      setError("Error al obtener la vista previa");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      const nuevoWidget = {
        id: uuidv4(),
        ...form,
      };
      await saveUserWidgets([...(preview?.widgets || []), nuevoWidget]);
      setGuardado(true);
      navigate("/dashboard");
    } catch (err) {
      setError("Error al guardar widget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center">🎨 Crear nuevo widget</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Título</label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Métrica</label>
            <select
              name="metrica"
              value={form.metrica}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="precio">Precio</option>
              <option value="puntaje">Puntaje</option>
              <option value="acierto">Acierto</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Tipo de gráfico</label>
            <select
              name="tipoDeGrafico"
              value={form.tipoDeGrafico}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="bar">Barras</option>
              <option value="line">Líneas</option>
              <option value="pie">Torta</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Agrupar por</label>
            <select
              name="dimension"
              value={form.dimension}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700"
            >
              <option value="categoria">Categoría</option>
              <option value="proveedor">Proveedor</option>
              <option value="fecha">Fecha</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handlePreview}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Vista previa
            </button>
            <button
              onClick={handleGuardar}
              disabled={loading || !preview}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Guardar widget
            </button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Generando vista previa...</p>
          ) : preview ? (
            <ChartPreview data={preview} tipo={form.tipoDeGrafico} />
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              Configura los campos y haz clic en “Vista previa” para generar el gráfico.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
