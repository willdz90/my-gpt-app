import axios from "../utils/axiosInstance";

export async function getLogs({ page = 1, limit = 15, filters = {} } = {}) {
  try {
    const rest = filters;
    const params = { page, limit, ...rest };
    const res = await axios.get("/audit/logs", { params });
    return res.data;
  } catch (error) {
    console.error("Error al obtener logs de auditoría", error);
    return { success: false, logs: [], total: 0 };
  }
}

export async function getHttpMethods() {
  try {
    const res = await axios.get("/audit/methods");
    return res.data.methods || [];
  } catch (error) {
    console.error("Error al obtener métodos HTTP únicos", error);
    return [];
  }
}
