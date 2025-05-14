const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportes.controller");
const { verifyToken } = require("../middleware/auth");
const auditMiddleware = require("../middleware/audit.middleware");

router.post("/ejecutar", verifyToken, auditMiddleware, reportesController.ejecutarConsultaPersonalizada);
router.post("/guardar", verifyToken, auditMiddleware, reportesController.guardarReporte);
router.get("/mis", verifyToken, auditMiddleware, reportesController.listarReportes);


module.exports = router;
