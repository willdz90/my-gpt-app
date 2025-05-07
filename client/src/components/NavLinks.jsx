// src/components/NavLinks.jsx
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/analizar', label: 'Analizar Producto' },
  { path: '/products', label: 'Productos' },
  { path: '/graficos', label: 'Gráficos' }
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
          className={`block px-4 py-2 rounded-md text-sm font-medium transition ${
            pathname === link.path
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
