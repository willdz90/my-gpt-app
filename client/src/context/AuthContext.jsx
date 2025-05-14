import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔄 control de carga global

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      const token = stored ? JSON.parse(stored)?.accessToken : null;

      if (token) {
        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000;
        const now = Date.now();

        if (now < exp) {
          setUser(decoded);
          localStorage.setItem("token_expiration", exp);
          localStorage.setItem("last_activity", now);
        } else {
          logout();
        }
      }
    } catch (err) {
      console.error("❌ Error al procesar token inicial:", err);
      logout();
    } finally {
      setLoading(false); // ✅ rompe el ciclo de carga global
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastActivity = Number(localStorage.getItem("last_activity"));
      const now = Date.now();
      const MAX_INACTIVITY = 15 * 60 * 1000;

      if (!lastActivity || isNaN(lastActivity)) return;
      if (now - lastActivity > MAX_INACTIVITY) {
        console.warn("⛔ Sesión cerrada por inactividad (AuthContext)");
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const persistSession = (token) => {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000;

    localStorage.setItem("user", JSON.stringify({ accessToken: token }));
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiration", exp);
    localStorage.setItem("last_activity", Date.now());

    setUser(decoded);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, persistSession, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
