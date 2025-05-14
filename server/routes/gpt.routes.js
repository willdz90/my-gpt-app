const express = require('express');
const router = express.Router();
const { verifyToken, hasRole } = require('../middleware/auth');
const auditMiddleware = require('../middleware/audit.middleware');
const { generateProductAnalysis } = require('../services/gpt.service');
const ProductAnalysis = require('../models/ProductAnalysis');

// POST /api/gpt/product-analysis → genera análisis desde GPT
router.post('/product-analysis', verifyToken, auditMiddleware, hasRole('analyst', 'manager', 'admin'), generateProductAnalysis);

// GET /api/gpt/product-analysis → obtener todos los análisis del usuario
router.get('/product-analysis', verifyToken, auditMiddleware, hasRole('analyst', 'manager', 'admin'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = await ProductAnalysis.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error al obtener análisis GPT:", error.message);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});

module.exports = router;
