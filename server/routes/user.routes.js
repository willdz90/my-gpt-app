// server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, checkRole } = require('../middleware/auth.middleware');


// Ruta: obtener usuario autenticado (real desde DB, sin contraseña)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.userId).select('-password');
    if (!dbUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ usuario: dbUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

// Ruta solo para admins (opcional)
router.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
  res.json({
    message: 'Bienvenido administrador',
    usuario: req.user
  });
});

module.exports = router;
