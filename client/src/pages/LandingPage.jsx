import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');

    if (token && expiration && Date.now() < parseInt(expiration)) {
      navigate('/analizar');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col">
      {/* Hero */}
      <section className="text-center py-20 px-4 md:px-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Potencia tu e-commerce con análisis inteligentes
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Descubre qué productos tienen mayor potencial de ventas mediante inteligencia artificial. Ideal para dropshipping, validación de ideas y más.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Crear cuenta
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Iniciar sesión
          </button>
        </motion.div>
      </section>

      {/* Beneficios */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">
        {[
          {
            title: 'Análisis Avanzado',
            text: 'Obtén insights de viralidad, rentabilidad y buyer persona usando IA.'
          },
          {
            title: 'Ahorra Tiempo',
            text: 'Evalúa múltiples productos sin necesidad de investigar manualmente.'
          },
          {
            title: 'Sin conocimientos técnicos',
            text: 'Interfaz sencilla, accesible para emprendedores sin experiencia técnica.'
          }
        ].map((b, i) => (
          <motion.div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2">{b.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{b.text}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA final */}
      <section className="text-center py-12">
        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ¿Listo para validar tu próximo producto ganador?
        </motion.p>
        <motion.button
          onClick={() => navigate('/register')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          Regístrate ahora
        </motion.button>
      </section>
    </div>
  );
}
