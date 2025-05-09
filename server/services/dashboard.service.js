export const getUserWidgets = async () => {
  try {
    const res = await axios.get("/api/dashboard/widgets");
    return res.data;
  } catch (error) {
    console.error("Error al obtener widgets:", error);
    return { success: false, data: [] };
  }
};
