const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const ProductAnalysis = require('../models/ProductAnalysis');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { productName, analysisText } = req.body;

    const analysis = new ProductAnalysis({
      user: req.user.userId,
      productName,
      analysisText
    });

    await analysis.save();

    res.status(201).json({
      message: 'Análisis guardado correctamente',
      analysis
    });
  } catch (error) {
    console.error('Error al guardar análisis:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
