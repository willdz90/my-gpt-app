// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import DashboardUsuario from "../pages/DashboardUsuario";
import Products from "../pages/Products";
import Layout from "../components/Layout";
import Analyze from "../pages/Analyze";
import ProductDetail from "../pages/ProductDetail";
import LandingPage from "../pages/LandingPage";
import Estadisticas from "../pages/Estadisticas";
import ReporteDetalle from "../pages/ReporteDetalle";
import AuditLogViewer from "../pages/AuditLogViewer";
import EditorDeWidgets from "../pages/EditorDeWidgets";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute";
import ReportesPersonalizados from "../pages/ReportesPersonalizados";
import SplashLoader from "../components/ui/SplashLoader";

export default function AppRoutes() {
  const { user, loading } = useAuth();
  const role = user?.role;

  // ⏳ Mientras carga la sesión, mostrar SplashLoader
  console.log(user)
  if (loading) {
    return <SplashLoader />;
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas para rol "user" */}
      {role === "user" && (
        <>
          <Route path="/usuario/dashboard" element={<PrivateRoute><Layout><DashboardUsuario /></Layout></PrivateRoute>} />
          <Route path="/analizar" element={<PrivateRoute><Layout><Analyze /></Layout></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Layout><Products /></Layout></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><Layout><ProductDetail /></Layout></PrivateRoute>} />
          <Route path="/editor-widgets" element={<PrivateRoute><Layout><EditorDeWidgets /></Layout></PrivateRoute>} />
          <Route path="/reporte/:id" element={<PrivateRoute><Layout><ReporteDetalle /></Layout></PrivateRoute>} />
          <Route path="/reportes-personalizados" element={<PrivateRoute><Layout><ReportesPersonalizados /></Layout></PrivateRoute>} />
        </>
      )}

      {/* Rutas para admin y managers */}
      {(role === "admin" || role === "manager") && (
        <>
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/graficos" element={<PrivateRoute><Layout><Estadisticas /></Layout></PrivateRoute>} />
          <Route path="/auditoria" element={<PrivateRoute><Layout><AuditLogViewer /></Layout></PrivateRoute>} />
          <Route path="/reporte/:id" element={<PrivateRoute><Layout><ReporteDetalle /></Layout></PrivateRoute>} />
        </>
      )}


      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to={role === "user" ? "/usuario/dashboard" : "/dashboard"} />} />
    </Routes>
  );
}
