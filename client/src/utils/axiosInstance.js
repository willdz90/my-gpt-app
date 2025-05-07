// src/utils/axiosInstance.js
import axios from 'axios';
import { logout } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Crear una nueva instancia de Axios sin interceptores
        const refreshAxios = axios.create({
          baseURL: import.meta.env.VITE_API_URL,
          withCredentials: true
        });

        const res = await refreshAxios.post('/api/auth/refresh');
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);
        localStorage.setItem('token_expiration', Date.now() + 60 * 60 * 1000); // 1 hora

        // Actualizar el encabezado Authorization y reintentar la solicitud original
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
