// src/components/Navbar.jsx
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline'

export default function Navbar({ onMenuToggle }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`flex items-center justify-between px-4 py-3 shadow-md sticky top-0 z-50 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-black text-white'
    }`}>
      <div className="flex items-center gap-3">
        {/* Botón hamburguesa solo en móvil */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-700 transition"
          onClick={onMenuToggle}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        <span className="text-lg font-bold">APG</span>
      </div>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-gray-700 transition"
      >
        {theme === 'dark' ? (
          <>
            <SunIcon className="w-5 h-5 text-yellow-400" />
            <span className="hidden sm:inline">Modo claro</span>
          </>
        ) : (
          <>
            <MoonIcon className="w-5 h-5 text-white" />
            <span className="hidden sm:inline text-white">Modo oscuro</span>
          </>
        )}
      </button>
    </nav>
  )
}
