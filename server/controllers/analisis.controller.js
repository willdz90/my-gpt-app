const Analisis = require("../models/Analisis");
const logger = require("../utils/logger"); // 🔐 Logging habilitado

const plantillas = {
  positivo: { /* tu contenido completo */ },
  neutro: { /* tu contenido completo */ },
  negativo: { /* tu contenido completo */ }
};

exports.simularAnalisis = async (req, res) => {
  const userId = req.user?.userId;
  const { tipo = "positivo" } = req.body;

  if (!["positivo", "negativo", "neutro"].includes(tipo)) {
    logger.warn(`🚫 Tipo inválido recibido en análisis: "${tipo}" (user: ${userId})`);
    return res.status(400).json({ success: false, message: "Tipo inválido" });
  }

  try {
    const data = plantillas[tipo];

    const analisis = new Analisis({
      userId,
      input: "Producto simulado para análisis",
      respuestaGPT: JSON.stringify(data),
      clasificacion: data.tipo,
      puntaje: data.puntuacion,
      acierto: tipo !== "negativo",
      falsoPositivo: false,
      fecha: new Date(),
      precio: data.precio,
      categoria: data.categoria,
      proveedor: data.proveedor
    });

    await analisis.save();

    logger.info(`✅ Análisis simulado (${tipo}) guardado para userId: ${userId}`);
    res.json({
      success: true,
      data: analisis,
      message: "Análisis simulado generado y guardado correctamente"
    });
  } catch (error) {
    logger.error(`❌ Error al simular análisis (${tipo}) userId: ${userId} - ${error.message}`);
    res.status(500).json({ success: false, message: "Error al simular análisis" });
  }
};

exports.getAnalisisPorId = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const analisis = await Analisis.findOne({ _id: id, userId });

    if (!analisis) {
      logger.warn(`🔍 No se encontró análisis con ID: ${id} para userId: ${userId}`);
      return res.status(404).json({ success: false, message: "Análisis no encontrado" });
    }

    logger.info(`📥 Análisis ID ${id} accedido por userId: ${userId}`);
    res.json({ success: true, data: analisis });
  } catch (error) {
    logger.error(`❌ Error al obtener análisis ID ${id} - userId: ${userId} - ${error.message}`);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
