const reportesService = require("../services/reportes.service");
const logger = require("../utils/logger");

exports.ejecutarConsultaPersonalizada = async (req, res) => {
  try {
    const configuracion = req.body;
    const userId = req.user.id;

    const resultado = await reportesService.ejecutar(configuracion, userId);
    res.status(200).json({ ok: true, data: resultado });
  } catch (error) {
    logger.error("Error ejecutando consulta personalizada:", error);
    res.status(500).json({ ok: false, error: "Error ejecutando el reporte." });
  }
};

exports.guardarReporte = async (req, res) => {
  try {
    const nuevo = await reportesService.guardarReporte(req.user.userId, req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    logger.error("Error guardando reporte:", err);
    res.status(500).json({ message: "Error al guardar el reporte" });
  }
};

exports.listarReportes = async (req, res) => {
  try {
    const reportes = await reportesService.obtenerReportesPorUsuario(req.user.userId);
    res.json(reportes);
  } catch (err) {
    logger.error("Error listando reportes:", err);
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};