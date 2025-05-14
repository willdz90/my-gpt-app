// src/services/analisis.service.js
import api from "../utils/axiosInstance";

/**
 * Simula un análisis vía backend
 * @param {string} tipo - 'positivo' | 'negativo' | 'neutro'
 * @returns {Promise<Object>} - Resultado del análisis
 */
export async function simularAnalisis(tipo = "positivo") {
  try {
    const res = await api.post("/analisis/simular", { tipo });
    return res.data;
  } catch (err) {
    console.error("❌ Error al simular análisis:", err.response?.data || err.message);
    throw new Error("Error al simular análisis. Intenta nuevamente.");
  }
}
