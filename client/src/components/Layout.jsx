import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import FocusHandler from './FocusHandler';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const esAnalyze = location.pathname === '/analizar';

  return (
    <div className="h-screen bg-black dark:bg-[#0c0c0c] flex flex-col">
      <Navbar onMenuToggle={() => setMobileMenuOpen(true)} />
      <SidebarMobile open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full h-full bg-white dark:bg-gray-800 rounded-tl-xl rounded-tr-xl overflow-hidden shadow-md">
          <aside className="hidden md:block w-64 border-r dark:border-gray-700">
            <Sidebar />
          </aside>

          <main className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`rounded-lg min-h-[calc(100vh-4rem)] transition-colors duration-300 ${
                  esAnalyze ? 'bg-transparent shadow-none' : 'bg-white dark:bg-gray-800 shadow p-6'
                }`}
              >
                {/* <FocusHandler /> */}
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
