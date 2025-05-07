// src/components/NavMenu.jsx
import { Link, useLocation } from 'react-router-dom'

export default function NavMenu() {
  const { pathname } = useLocation()

  const links = [
    { path: '/analizar', label: 'Analizar Producto' },
    { path: '/products', label: 'Productos' },
    { path: '/graficos', label: 'Gráficos' },
  ]

  return (
    <nav className="hidden md:flex justify-center gap-8 bg-white dark:bg-gray-800 py-3 border-b border-gray-200 dark:border-gray-700">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`text-sm font-medium transition-colors ${
            pathname === link.path
              ? 'text-blue-600 dark:text-blue-400 underline underline-offset-4'
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
