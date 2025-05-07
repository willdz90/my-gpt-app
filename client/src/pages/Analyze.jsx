import { useState, useEffect } from 'react'
import ProductForm from '../components/ProductForm'
import ProductPreview from '../components/ProductPreview'
import ProductResult from '../components/ProductResult'
import Loader from '../components/Loader'
import { AnimatePresence, motion } from 'framer-motion'
import mockResults from '../mocks/mockResults'

export default function Analyze() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    caracteristicas: '',
    precio_esperado: '',
    puntos_venta: '',
    target: '',
    idioma: 'es',
    proveedor: '',
    precio_proveedor: '',
    imagenes: [],
    modoBasico: false
  })

  const [view, setView] = useState('form')
  const [result, setResult] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleSubmit = () => {
    scrollToTop()
    setView('loading')
    setTimeout(() => {
      setResult(mockResults.positivo)
      setView('result')
    }, 1500)
  }

  const handleReset = () => {
    scrollToTop()
    setFormData({
      nombre: '',
      descripcion: '',
      categoria: '',
      caracteristicas: '',
      precio_esperado: '',
      puntos_venta: '',
      target: '',
      idioma: 'es',
      proveedor: '',
      precio_proveedor: '',
      imagenes: [],
      modoBasico: false
    })
    setResult(null)
    setView('form')
  }

  const transitionBase = { duration: 0.6, ease: 'easeInOut' }

  return (
    <div className="w-full transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        📊 Cámara de Análisis de Producto
      </h2>

      <AnimatePresence mode="wait">
        {view === 'form' && (
          <motion.div
            key="form"
            className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionBase}
          >
            <motion.div
              initial={isMobile ? { opacity: 0 } : { x: 0 }}
              animate={isMobile ? { opacity: 1 } : { x: 0 }}
              exit={isMobile ? { opacity: 0 } : { x: '-100%', opacity: 0 }}
              transition={transitionBase}
            >
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onReset={handleReset}
              />
            </motion.div>
            <motion.div
              initial={isMobile ? { opacity: 0 } : { x: 0 }}
              animate={isMobile ? { opacity: 1 } : { x: 0 }}
              exit={isMobile ? { opacity: 0 } : { x: '100%', opacity: 0 }}
              transition={transitionBase}
            >
              <ProductPreview product={formData} />
            </motion.div>
          </motion.div>
        )}

        {view === 'loading' && (
          <motion.div
            key="loading"
            className="flex justify-center items-center min-h-[300px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionBase}
          >
            <Loader />
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div
            key="result"
            className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6"
            initial={{ scale: isMobile ? 1 : 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: isMobile ? 1 : 0.8, opacity: 0 }}
            transition={transitionBase}
          >
            <ProductPreview product={formData} />
            <div className="space-y-6">
              <ProductResult result={result} />
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Nuevo análisis
                </button>
                <button
                  onClick={() => alert('Simulando guardar análisis')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Guardar análisis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
