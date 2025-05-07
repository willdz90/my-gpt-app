// src/components/SidebarMobile.jsx
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { logout } from '../utils/auth';

const links = [
  { path: '/analizar', label: 'Analizar Producto' },
  { path: '/products', label: 'Productos' },
  { path: '/graficos', label: 'Gráficos' }
];

export default function SidebarMobile({ open, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-bold text-gray-800 dark:text-white">Menú</span>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`block px-3 py-2 rounded text-sm font-medium ${
                pathname === link.path
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Botón de logout */}
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </>
  );
}
