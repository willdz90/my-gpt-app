const Analisis = require("../models/Analisis");
const logger = require("../utils/logger");

/**
 * POST /api/query/ejecutar
 * Recibe:
 * {
 *   columnas: ["fecha", "categoria"],
 *   agrupacion: "categoria",
 *   metricaPrincipal: "puntaje",
 *   filtros: { categoria: ["Electrónica", "Hogar"] }
 * }
 */
exports.ejecutarQuery = async (req, res) => {
  const userId = req.user?.userId;
  const { columnas = [], filtros = {}, metricaPrincipal, agrupacion } = req.body;

  if (!userId || columnas.length < 2 || !metricaPrincipal) {
    logger.warn(`⚠️ Parámetros insuficientes para ejecutarQuery - userId: ${userId}`);
    return res.status(400).json({ success: false, message: "Parámetros insuficientes" });
  }

  try {
    const match = { userId };
    for (const [key, val] of Object.entries(filtros)) {
      match[key] = Array.isArray(val) ? { $in: val } : val;
    }

    const groupId = {};
    columnas.forEach(col => groupId[col] = `$${col}`);

    const pipeline = [
      { $match: match },
      {
        $group: {
          _id: groupId,
          valor: { $avg: `$${metricaPrincipal}` }
        }
      },
      {
        $project: {
          _id: 0,
          ...columnas.reduce((acc, col) => {
            acc[col] = `$_id.${col}`;
            return acc;
          }, {}),
          [metricaPrincipal]: "$valor"
        }
      },
      { $sort: { [columnas[0]]: 1 } }
    ];

    const data = await Analisis.aggregate(pipeline);

    logger.info(`📊 Query ejecutada correctamente por userId: ${userId} - columnas: ${columnas.join(", ")}`);
    res.json({ success: true, data });
  } catch (error) {
    logger.error(`❌ Error al ejecutar query (userId: ${userId}): ${error.message}`);
    res.status(500).json({ success: false, message: "Error interno al procesar la consulta" });
  }
};
