import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products' 
import Layout from '../components/Layout'
import Analyze from '../pages/Analyze'
import ProductDetail from '../pages/ProductDetail'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/analizar" element={<Layout><Analyze /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
    </Routes>
  )
}
