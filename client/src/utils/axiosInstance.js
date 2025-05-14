import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user)?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const lastActivityRaw = localStorage.getItem("last_activity");
      const lastActivity = Number(lastActivityRaw);
      const now = Date.now();
      const MAX_INACTIVITY = 15 * 60 * 1000;

      console.warn("⏱ Validando inactividad...");
      if (!lastActivityRaw || isNaN(lastActivity)) {
        console.warn("⚠️ No hay registro de actividad previa → cerrar sesión");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(new Error("Sesión inválida (no hay actividad registrada)"));
      }

      if (now - lastActivity > MAX_INACTIVITY) {
        console.warn("⛔ Sesión expirada por inactividad");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(new Error("Sesión expirada por inactividad"));
      }

      try {
        const res = await axios.post("/api/auth/refresh-token", {}, { withCredentials: true });
        const token = res.data.token;
        const decoded = JSON.parse(atob(token.split(".")[1]));

        localStorage.setItem("user", JSON.stringify({ accessToken: token }));
        localStorage.setItem("token", token);
        localStorage.setItem("token_expiration", decoded.exp * 1000);
        localStorage.setItem("last_activity", Date.now());

        originalRequest.headers.Authorization = `Bearer ${token}`;
        window.dispatchEvent(new Event("token_refreshed"));

        return axiosInstance(originalRequest);
      } catch (err) {
        console.warn("⛔ Error al renovar token");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
