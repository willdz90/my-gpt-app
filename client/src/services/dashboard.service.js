import axios from "../utils/axiosInstance";

// Guarda los widgets personalizados del usuario
export const saveUserWidgets = async (widgets) => {
  try {
    const res = await axios.post("/dashboard/widgets", { widgets });
    return res.data;
  } catch (error) {
    console.error("Error al guardar widgets:", error);
    return { success: false };
  }
};

// Obtiene los widgets del usuario desde MongoDB
export const getUserWidgets = async () => {
  try {
    const res = await axios.get("/dashboard/widgets");
    return res.data;
  } catch (error) {
    console.error("Error al obtener widgets:", error);
    return { success: false, data: [] };
  }
};
