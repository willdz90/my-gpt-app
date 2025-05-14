import axios from "../utils/axiosInstance";

export const getAnalisis = async () => {
  try {
    const response = await axios.get("/analisis");
    return { success: true, data: response.data.data }; // <- AQUÍ
  } catch (error) {
    console.error("Error fetching analysis list:", error);
    return { success: false, message: error.message };
  }
};

export const getAnalisisPorId = async (id) => {
  try {
    const response = await axios.get(`/analisis/${id}`);
    return { success: true, data: response.data.data }; // acceder a .data interno
  } catch (error) {
    console.error('Error fetching analysis by ID:', error);
    return { success: false, message: error.message };
  }
};
