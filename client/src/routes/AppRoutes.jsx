// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Layout from '../components/Layout';
import Analyze from '../pages/Analyze';
import ProductDetail from '../pages/ProductDetail';
import LandingPage from '../pages/LandingPage';
import PrivateRoute from '../components/PrivateRoute';
import Estadisticas from '../pages/Estadisticas';
import ReporteDetalle from '../pages/ReporteDetalle';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/graficos" element={<PrivateRoute><Layout><Estadisticas /></Layout></PrivateRoute>} />
      <Route path="/reporte/:id" element={<PrivateRoute><Layout><ReporteDetalle /></Layout></PrivateRoute>} />

      <Route path="/analizar" element={<PrivateRoute><Layout><Analyze /></Layout></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><Layout><Products /></Layout></PrivateRoute>} />
      <Route path="/products/:id" element={<PrivateRoute><Layout><ProductDetail /></Layout></PrivateRoute>} />
    </Routes>
  );
}
