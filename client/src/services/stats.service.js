import axios from "../utils/axiosInstance";

export const fetchEstadisticasResumen = async () => {
  try {
    const response = await axios.get("/stats/resumen");
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return { success: false, message: error.message };
  }
};
