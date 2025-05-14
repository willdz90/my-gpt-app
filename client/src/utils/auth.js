// src/utils/auth.js
import axios from './axiosInstance';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const saveAccessToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const saveRefreshToken = (token) => {
  document.cookie = `refreshToken=${token}; path=/; HttpOnly; Secure; SameSite=Strict`;
};

export const getRefreshToken = () => {
  const match = document.cookie.match(new RegExp('(^| )refreshToken=([^;]+)'));
  return match ? match[2] : null;
};

export const removeRefreshToken = () => {
  document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token found");

  try {
    const response = await axios.post('/api/auth/refresh-token', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = response.data.token;
    const decoded = JSON.parse(atob(newAccessToken.split(".")[1]));
    saveAccessToken(newAccessToken);
    localStorage.setItem("user", JSON.stringify({ accessToken: newAccessToken }));
    localStorage.setItem("token", newAccessToken);
    localStorage.setItem("token_expiration", decoded.exp * 1000);
    localStorage.setItem("last_activity", Date.now());

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    removeAccessToken();
    removeRefreshToken();
    throw error;
  }
};

export const logout = () => {
  removeAccessToken();
  removeRefreshToken();
  localStorage.clear();
  window.location.href = '/login';
};

export const validateAndRefreshSession = async () => {
  try {
    const token = localStorage.getItem('token');
    const exp = parseInt(localStorage.getItem('token_expiration'), 10);
    const lastActivity = parseInt(localStorage.getItem('last_activity'), 10);
    const now = Date.now();
    const MAX_INACTIVITY = 15 * 60 * 1000;

    if (!token || !exp || now >= exp || now - lastActivity > MAX_INACTIVITY) {
      const refreshed = await refreshAccessToken();
      return refreshed || null;
    } else {
      localStorage.setItem("last_activity", now);
      return token;
    }
  } catch (err) {
    console.warn("❌ Error validando sesión:", err);
    return null;
  }
};
