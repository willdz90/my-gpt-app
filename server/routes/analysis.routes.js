// server/routes/analysis.routes.js
const express = require('express');
const { validationResult } = require('express-validator');
const { validateAnalysis } = require('../utils/validators');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, validateAnalysis, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Aquí tu lógica de análisis...
    res.status(201).json({ message: 'Producto analizado correctamente.' });
  } catch (err) {
    next(err); // Enviar al middleware de errorHandler
  }
});

module.exports = router;
