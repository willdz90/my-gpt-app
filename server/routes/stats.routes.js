const express = require("express");
const router = express.Router();
const { verifyToken, hasRole } = require("../middleware/auth");
const { getEstadisticasResumen } = require("../controllers/stats.controller");

// GET /api/stats/resumen → solo manager o admin
router.get("/resumen", verifyToken, hasRole("manager", "admin"), getEstadisticasResumen);

module.exports = router;
