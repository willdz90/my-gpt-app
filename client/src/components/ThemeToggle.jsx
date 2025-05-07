// src/components/ThemeToggle.jsx
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-2 px-4 py-1 rounded-full transition bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-purple-400" />
      )}
      <span
        className={`text-sm transition-all duration-300
        max-w-0 opacity-0 overflow-hidden
        md:group-hover:max-w-[150px] md:group-hover:opacity-100`}
      >
        {isDark ? 'Tema claro' : 'Tema oscuro'}
      </span>
    </button>
  );
}
