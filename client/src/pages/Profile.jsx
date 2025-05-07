// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/api/users/me')
      .then(res => setUser(res.data.usuario))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return <div className="p-4 text-gray-700 dark:text-white">Cargando perfil...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Perfil del Usuario</h1>
      <div className="text-gray-700 dark:text-gray-200">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>ID:</strong> {user._id}</p>
      </div>
    </div>
  );
}
