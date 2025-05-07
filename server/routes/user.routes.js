const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth.middleware');

// Ruta accesible solo para usuarios autenticados
router.get('/me', verifyToken, (req, res) => {
  res.json({
    message: 'Usuario autenticado correctamente',
    usuario: req.user
  });
});

// Ruta accesible solo para administradores
router.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
  res.json({
    message: 'Bienvenido administrador',
    usuario: req.user
  });
});

module.exports = router;
