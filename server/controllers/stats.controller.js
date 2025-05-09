const statsService = require('../services/stats.service');

exports.getEstadisticasResumen = async (req, res) => {
  try {
    const data = await statsService.obtenerResumenMock(req.user?.id);
    res.json({ success: true, data, message: "Resumen estadístico generado (modo mock)" });
  } catch (error) {
    console.error("Error en getEstadisticasResumen:", error.message);
    res.status(500).json({ success: false, data: null, message: "Error al obtener estadísticas" });
  }
};
