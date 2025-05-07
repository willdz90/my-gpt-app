import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from './utils/auth';
import api from './utils/axiosInstance';
import { AuthProvider, useAuth } from './context/AuthContext';

const INACTIVITY_LIMIT = 30 * 60 * 1000;

function AppWrapper() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const { setUser, expired, setExpired } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');
    console.log('🔍 TOKEN EN LOCAL:', token);
    console.log('⏱️ EXPIRA EN:', expiration);
  
    if (!token || !expiration) {
      console.log('🟡 No hay token o expiración. Mostrando vistas públicas.');
      setLoading(false);
      return;
    }
  
    if (Date.now() > parseInt(expiration)) {
      console.log('❌ Token expirado. Cerrando sesión.');
      logout();
      setLoading(false);
      return;
    }
  
    console.log('🔐 Token presente. Verificando con backend...');
  
    api.get('/api/users/me')
      .then(res => {
        console.log('✅ Sesión válida. Usuario:', res.data.usuario);
        setUser(res.data.usuario);
        localStorage.setItem('last_activity', Date.now());
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error al validar sesión:', err);
        logout();
        setLoading(false);
      });
  
    const interval = setInterval(() => {
      const last = localStorage.getItem('last_activity');
      if (last && Date.now() - parseInt(last) > INACTIVITY_LIMIT) {
        logout();
        setExpired(true);
      }
    }, 60000);
  
    const updateActivity = () => localStorage.setItem('last_activity', Date.now());
    window.addEventListener('click', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('scroll', updateActivity);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, []);
  

  useEffect(() => {
    if (expired) toast.info('Tu sesión ha expirado. Por favor inicia sesión de nuevo.');
  }, [expired]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-600 dark:text-white">Verificando sesión...</div>;
  }

  return <AppRoutes />;
}

export default AppWrapper;
