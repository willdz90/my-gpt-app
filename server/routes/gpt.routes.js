const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { generateProductAnalysis } = require('../services/gpt.service');
const ProductAnalysis = require('../models/ProductAnalysis');

router.post('/analyze', verifyToken, async (req, res) => {
  try {
    const {
      productName, price, origin, function: fn,
      features, audience, differential, image
    } = req.body;

    // Validación mínima
    if (!productName && !image) {
      return res.status(400).json({ message: 'Debe proporcionar al menos un nombre de producto o imagen.' });
    }

    const analysisText = await generateProductAnalysis(req.body);

    const analysis = new ProductAnalysis({
      user: req.user.userId,
      productName,
      price,
      origin,
      function: fn,
      features,
      audience,
      differential,
      image,
      analysisText
    });

    await analysis.save();

    res.status(201).json({ message: 'Análisis generado y guardado', analysis });
  } catch (error) {
    console.error('❌ Error GPT:', error.response?.data || error.message || error);
    res.status(500).json({ message: 'Error al generar el análisis' });
  }
  
});

module.exports = router;
