// src/services/query.service.js

import api from "../utils/axiosInstance";

/**
 * Ejecuta una consulta dinámica para generar datos de widgets.
 * @param {Object} config - Configuración de la consulta (métrica, agrupación, filtros)
 * @returns {Promise<Object>} - Resultado con array de datos
 */
export async function ejecutarConsulta(config) {
  try {
    const response = await api.post("/query/ejecutar", config);
    return response.data;
  } catch (error) {
    console.error("❌ Error al ejecutar consulta:", error.response?.data || error.message);
    throw new Error("No se pudo ejecutar la consulta. Verifica los parámetros.");
  }
}
