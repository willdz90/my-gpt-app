import axiosInstance from "../utils/axiosInstance";

export const ejecutarReporte = async (config) => {
  try {
    const response = await axiosInstance.post("/api/reportes/ejecutar", config);
    return response.data;
  } catch (error) {
    const mensaje = error?.response?.data?.error || "Error al ejecutar el reporte.";
    throw new Error(mensaje);
  }
};
