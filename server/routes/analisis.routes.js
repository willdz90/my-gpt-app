const express = require("express");
const router = express.Router();
const {
  simularAnalisis,
  getAnalisisPorId
} = require("../controllers/analisis.controller");
const { verifyToken, hasRole } = require("../middleware/auth");
const auditMiddleware = require("../middleware/audit.middleware");
const validate = require("../middleware/validate");
const { simularAnalisisSchema } = require("../validators/analisis.validator");
const Analisis = require("../models/Analisis");

// GET /api/analisis → obtener todos los análisis del usuario autenticado
router.get("/", verifyToken, auditMiddleware, hasRole("user", "manager", "analyst"), async (req, res) => {
  try {
    const userId = req.user.userId;
    const analisis = await Analisis.find({ userId }).sort({ fecha: -1 });
    res.json({ success: true, data: analisis });
  } catch (error) {
    console.error("❌ Error al obtener análisis:", error.message);
    res.status(500).json({ success: false, message: "Error al obtener análisis" });
  }
});

// GET /api/analisis/:id → obtener un análisis por ID
router.get("/:id", verifyToken, auditMiddleware, hasRole("user", "manager", "analyst"), getAnalisisPorId);

// POST /api/analisis/simular → simular un análisis con validación Joi
router.post(
  "/simular",
  verifyToken, auditMiddleware,
  hasRole("user", "manager", "analyst"),
  validate(simularAnalisisSchema),
  simularAnalisis
);

module.exports = router;
