// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Registrar
      await api.post('/api/auth/register', form);
      toast.success('Usuario creado correctamente');

      // Login automático
      const loginRes = await api.post('/api/auth/login', form);
      const token = loginRes.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('token_expiration', Date.now() + 60 * 60 * 1000); // 1 hora
      localStorage.setItem('last_activity', Date.now());

      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md space-y-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crear Cuenta</h1>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
}
