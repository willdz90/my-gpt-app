// src/components/AccountMenu.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { logout } from '../utils/auth';
import axios from 'axios';

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setEmail(res.data.usuario.email))
      .catch(() => logout());
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
        <UserCircleIcon className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded z-50 text-sm">
          <div className="px-4 py-2 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            {email || 'Cargando...'}
          </div>
          <button
            onClick={() => {
              navigate('/perfil');
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
          >
            Mi cuenta
          </button>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
