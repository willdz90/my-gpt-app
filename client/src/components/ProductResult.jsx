// src/components/ProductResult.jsx
import {
    FaCheckCircle,
    FaTimesCircle,
    FaInfoCircle,
    FaTiktok,
    FaFacebook,
    FaAmazon,
  } from "react-icons/fa";
  
  const estrellas = (n) => "⭐️".repeat(n);
  
  export default function ProductResult({ result }) {
    if (!result) return null;
  
    const {
      tipo,
      criterios,
      puntuacion,
      veredicto,
      recomendacion,
      rol,
      videoViral,
      riesgos,
      ventaCruzada,
      nichosSecundarios,
      buyerPersona,
      fichaPublicitaria,
    } = result;
  
    const renderRiesgo = (label, val, Icon) => (
      <div className="flex items-center gap-2">
        <Icon className={`text-lg ${val ? "text-green-500" : "text-red-500"}`} />
        <span className="text-sm">{label}</span>
      </div>
    );
  
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6 transition-all">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🧠 Resultado del análisis
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              tipo === "positivo"
                ? "bg-green-100 text-green-700"
                : tipo === "neutro"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {tipo.toUpperCase()}
          </span>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criterios &&
            Object.entries(criterios).map(([clave, valor]) => (
              <div key={clave} className="flex justify-between">
                <span className="capitalize">{clave.replace(/([A-Z])/g, " $1")}:</span>
                <span>{estrellas(valor)}</span>
              </div>
            ))}
        </div>
  
        <div className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
          <p>
            <strong>🎯 Puntuación:</strong> {puntuacion}/100
          </p>
          <p>
            <strong>✅ Veredicto:</strong> {veredicto}
          </p>
          <p>
            <strong>📌 Recomendación:</strong> {recomendacion}
          </p>
  
          {rol && (
            <p>
              <strong>🧭 Rol estratégico:</strong> {rol.tipo} – {rol.descripcion}
            </p>
          )}
  
          {videoViral && (
            <div>
              <strong>🎥 Idea de video viral:</strong>
              <ul className="pl-5 list-disc">
                <li>Estilo: {videoViral.estilo}</li>
                <li>Guion: {videoViral.guion}</li>
              </ul>
            </div>
          )}
  
          {riesgos && (
            <div>
              <strong>🚫 Evaluación en plataformas:</strong>
              <div className="flex gap-4 mt-2">
                {renderRiesgo("TikTok Ads", riesgos.tiktok, FaTiktok)}
                {renderRiesgo("Meta Ads", riesgos.meta, FaFacebook)}
                {renderRiesgo("Amazon", riesgos.amazon, FaAmazon)}
              </div>
            </div>
          )}
  
          {ventaCruzada && (
            <p>
              <strong>🔄 Productos complementarios:</strong> {ventaCruzada.join(", ")}
            </p>
          )}
  
          {nichosSecundarios && (
            <p>
              <strong>🧠 Nichos secundarios:</strong> {nichosSecundarios.join(", ")}
            </p>
          )}
  
          {buyerPersona && (
            <div className="pt-4">
              <strong>🧍 Buyer Persona:</strong>
              <ul className="pl-5 list-disc">
                <li>Nombre: {buyerPersona.nombre}</li>
                <li>Edad: {buyerPersona.edad}</li>
                <li>Intereses: {buyerPersona.intereses.join(", ")}</li>
                <li>Redes: {buyerPersona.redes.join(", ")}</li>
                <li>Motivación: {buyerPersona.motivacion}</li>
              </ul>
            </div>
          )}
  
          {fichaPublicitaria && (
            <div className="pt-4">
              <strong>🪄 Ficha publicitaria:</strong>
              <ul className="pl-5 list-disc">
                <li>Por qué funciona: {fichaPublicitaria.porQueFunciona}</li>
                <li>Problema: {fichaPublicitaria.problema}</li>
                <li>Diferencial: {fichaPublicitaria.diferencial}</li>
                <li>Potencial viral: {fichaPublicitaria.viral}</li>
                <li>Nombre viral: {fichaPublicitaria.nombreViral}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
  