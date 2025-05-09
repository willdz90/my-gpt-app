import axios from "../utils/axiosInstance";

export const fetchEstadisticasResumen = async () => {
  try {
    const res = await axios.get("/api/stats/resumen");
    return res.data;
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return { success: false, data: null, message: "Error al conectar con el servidor" };
  }
};

