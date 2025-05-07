// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('token_expiration');
  const isAuthenticated = token && expiration && Date.now() < parseInt(expiration);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
