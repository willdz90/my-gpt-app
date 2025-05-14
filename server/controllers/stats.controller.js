const Analisis = require("../models/Analisis");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

exports.getEstadisticasResumen = async (req, res) => {
  const userId = req.user?.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    logger.warn("⚠️ ID de usuario inválido en estadísticas");
    return res.status(400).json({ success: false, message: "ID de usuario inválido" });
  }

  try {
    const historico = await Analisis.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const data = historico.map(entry => ({
      fecha: entry._id,
      analisis: entry.total
    }));

    logger.info(`📈 Estadísticas generadas para userId: ${userId}`);
    res.json({ success: true, data: { historico: data } });
  } catch (error) {
    logger.error(`❌ Error al obtener estadísticas (userId: ${userId}): ${error.message}`);
    res.status(500).json({ success: false, message: "Error al obtener estadísticas" });
  }
};
