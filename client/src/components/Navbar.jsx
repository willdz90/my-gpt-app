// src/components/Navbar.jsx
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline'
import AccountMenu from './AccountMenu';

export default function Navbar({ onMenuToggle }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme !== 'dark';

  return (
    <nav
      className={`flex items-center justify-between px-4 py-3 shadow-md sticky top-0 z-50 backdrop-blur transition-colors duration-300 ${
        isDark ? 'bg-bg-base/80 text-text-primary' : 'bg-white text-lightPrimary'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded hover:bg-accent-primary/10 transition"
          onClick={onMenuToggle}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <span className="text-lg font-bold hover:text-accent-primary transition">APG</span>
      </div>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent-primary/10 transition focus:outline-none focus:ring-2 focus:ring-accent-secondary"
      >
        {theme === 'dark' ? (
          <>
            <SunIcon className="w-5 h-5 text-yellow-400" />
            <span className="hidden sm:inline">Modo claro</span>
          </>
        ) : (
          <>
            <MoonIcon className="w-5 h-5 text-accent-primary" />
            <span className="hidden sm:inline">Modo oscuro</span>
          </>
        )}
      </button>

      <div className="ml-auto">
        <AccountMenu />
      </div>
    </nav>
  );
}
