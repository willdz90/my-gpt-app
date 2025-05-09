import axios from "../utils/axiosInstance";

export const saveUserWidgets = async (widgets) => {
  try {
    const res = await axios.post("/api/dashboard/widgets", { widgets });
    return res.data;
  } catch (error) {
    console.error("Error al guardar widgets:", error);
    return { success: false };
  }
};
