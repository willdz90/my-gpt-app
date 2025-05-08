import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import FocusHandler from './FocusHandler';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-black dark:bg-black flex flex-col">
      {/* Navbar fija arriba */}
      <Navbar onMenuToggle={() => setMobileMenuOpen(true)} />

      {/* Menú móvil */}
      <SidebarMobile open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Contenedor central de toda la app */}
      <div className="flex flex-1 overflow-hidden">
        {/* Caja blanca principal tipo Shopify */}
        <div className="flex w-full h-full bg-white dark:bg-gray-800 rounded-tl-xl rounded-tr-xl overflow-hidden shadow-md">
          {/* Sidebar izquierda en escritorio */}
          <aside className="hidden md:block w-64 border-r dark:border-gray-700">
            <Sidebar />
          </aside>

          {/* Contenido con scroll interno */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* <FocusHandler /> */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
