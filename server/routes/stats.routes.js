const express = require('express');
const router = express.Router();
const { getEstadisticasResumen } = require('../controllers/stats.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/resumen', verifyToken, getEstadisticasResumen);

module.exports = router;
