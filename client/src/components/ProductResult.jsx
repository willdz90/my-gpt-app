import {
  FaTiktok,
  FaFacebook,
  FaAmazon
} from "react-icons/fa";

const estrellas = (n) => "⭐️".repeat(n || 0);
const calificacion5 = (p) => Math.round((p / 100) * 5 * 10) / 10;

export default function ProductResult({ result }) {
  if (!result || typeof result !== "object") return null;

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
    precio,
    proveedor,
    categoria,
  } = result;

  const renderRiesgo = (label, val, Icon) => (
    <div className="flex items-center gap-2">
      <Icon className={`text-lg ${val ? "text-green-500" : "text-red-500"}`} />
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow space-y-6 text-sm text-gray-700 dark:text-gray-200">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          🧠 Resultado del análisis
        </h2>
        {tipo && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
              tipo === "positivo"
                ? "bg-green-100 text-green-700"
                : tipo === "neutro"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {tipo}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        {categoria && <div><strong>📂 Categoría:</strong> {categoria}</div>}
        {proveedor && <div><strong>🏷️ Proveedor:</strong> {proveedor}</div>}
        {precio && <div><strong>💰 Precio:</strong> ${precio} USD</div>}
      </div>

      {criterios && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(criterios).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center gap-3">
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
              <span className="text-yellow-500 text-base">{estrellas(value)}</span>
            </div>
          ))}
        </div>
      )}

      {puntuacion !== undefined && (
        <p>
          <strong>📊 Puntuación:</strong> {calificacion5(puntuacion)} / 5 estrellas
        </p>
      )}

      {veredicto && (
        <p>
          <strong>
            {tipo === "negativo"
              ? "⛔ Veredicto:"
              : tipo === "neutro"
              ? "⚠️ Veredicto:"
              : "✅ Veredicto:"}
          </strong>{" "}
          {veredicto}
        </p>
      )}

      {recomendacion && (
        <p>
          <strong>📌 Recomendación:</strong> {recomendacion}
        </p>
      )}

      {rol && (
        <p>
          <strong>🎯 Rol estratégico:</strong> {rol.tipo} — {rol.descripcion}
        </p>
      )}

      {videoViral && (
        <div>
          <strong>📽️ Idea de video viral:</strong>
          <ul className="list-disc pl-5">
            {videoViral.estilo && <li>Estilo: {videoViral.estilo}</li>}
            {videoViral.guion && <li>Guion: {videoViral.guion}</li>}
          </ul>
        </div>
      )}

      {riesgos && (
        <div>
          <strong>📲 Evaluación en plataformas:</strong>
          <div className="flex gap-4 mt-2">
            {renderRiesgo("TikTok Ads", riesgos.tiktok, FaTiktok)}
            {renderRiesgo("Meta Ads", riesgos.meta, FaFacebook)}
            {renderRiesgo("Amazon", riesgos.amazon, FaAmazon)}
          </div>
        </div>
      )}

      {ventaCruzada?.length > 0 && (
        <p>
          <strong>🔗 Productos complementarios:</strong> {ventaCruzada.join(", ")}
        </p>
      )}

      {nichosSecundarios?.length > 0 && (
        <p>
          <strong>🏠 Nichos secundarios:</strong> {nichosSecundarios.join(", ")}
        </p>
      )}

      {buyerPersona && (
        <div>
          <strong>🧑‍💻 Buyer Persona:</strong>
          <ul className="list-disc pl-5">
            {buyerPersona.nombre && <li>Nombre: {buyerPersona.nombre}</li>}
            {buyerPersona.edad && <li>Edad: {buyerPersona.edad}</li>}
            {buyerPersona.intereses?.length > 0 && (
              <li>Intereses: {buyerPersona.intereses.join(", ")}</li>
            )}
            {buyerPersona.redes?.length > 0 && (
              <li>Redes: {buyerPersona.redes.join(", ")}</li>
            )}
            {buyerPersona.motivacion && <li>Motivación: {buyerPersona.motivacion}</li>}
          </ul>
        </div>
      )}

      {fichaPublicitaria && (
        <div>
          <strong>🎨 Ficha publicitaria:</strong>
          <ul className="list-disc pl-5">
            {fichaPublicitaria.porQueFunciona && <li>Por qué funciona: {fichaPublicitaria.porQueFunciona}</li>}
            {fichaPublicitaria.problema && <li>Problema: {fichaPublicitaria.problema}</li>}
            {fichaPublicitaria.diferencial && <li>Diferencial: {fichaPublicitaria.diferencial}</li>}
            {fichaPublicitaria.viral && <li>Potencial viral: {fichaPublicitaria.viral}</li>}
            {fichaPublicitaria.nombreViral && <li>Nombre viral: {fichaPublicitaria.nombreViral}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
