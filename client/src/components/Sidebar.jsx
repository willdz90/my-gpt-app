// src/components/Sidebar.jsx
import NavLinks from './NavLinks';

export default function Sidebar() {
  return (
    <div className="p-4 w-full">
      <div className="text-lg font-bold mb-6 text-gray-800 dark:text-white">APG</div>
      <NavLinks />
    </div>
  );
}
