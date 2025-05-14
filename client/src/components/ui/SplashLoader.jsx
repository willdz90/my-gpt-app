import React from "react";

export default function SplashLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-gray-600 dark:text-white text-xl font-semibold animate-pulse">
        Cargando tu sesión...
      </div>
    </div>
  );
}
