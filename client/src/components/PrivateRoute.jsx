// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SplashLoader from './ui/SplashLoader';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return <SplashLoader />;
  }

  return user ? children : <Navigate to="/login" />;
}
