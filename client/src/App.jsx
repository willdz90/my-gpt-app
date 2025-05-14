import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');

    console.log('🔍 TOKEN EN LOCAL:', token);
    console.log('⏱️ EXPIRA EN:', expiration);

    if (!token || !expiration) {
      console.log('🟡 No hay token o expiración. Mostrando vistas públicas.');
    } else {
      console.log('🔐 Token encontrado. Sesión pendiente de validación por AuthContext.');
    }

    setLoading(false);
  }, []);

  if (loading) return <div className="text-center mt-10">Cargando...</div>;

  return <AppRoutes />;
}

export default AppWrapper;
