// src/components/NavLinks.jsx
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import { FiZap, FiPackage, FiBarChart2, FiHome, FiLogOut } from 'react-icons/fi';

const links = [
  { path: '/dashboard', label: 'Inicio', icon: <FiHome /> },
  { path: '/analizar', label: 'Analizar Producto', icon: <FiZap /> },
  { path: '/products', label: 'Productos', icon: <FiPackage /> },
  { path: '/graficos', label: 'Informes y estadísticas', icon: <FiBarChart2 /> }
];

export default function NavLinks({ onClick }) {
  const { pathname } = useLocation();

  return (
    <nav className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
            pathname === link.path
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}

      {/* Cerrar sesión */}
      <button
        onClick={() => {
          if (onClick) onClick();
          logout();
        }}
        className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 transition"
      >
        <FiLogOut className="text-lg" />
        Cerrar sesión
      </button>
    </nav>
  );
}
