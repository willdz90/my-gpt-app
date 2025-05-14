const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, hasRole } = require('../middleware/auth');
const auditMiddleware = require('../middleware/audit.middleware');
const validate = require('../middleware/validate');
const { dashboardLayoutSchema } = require('../validators/dashboard.validator');

const userController = require('../controllers/user.controller');

// Crear usuario con rol (solo admin y superadmin)
router.post('/', verifyToken, hasRole('admin', 'superadmin'), auditMiddleware, userController.createUser);
router.get('/', verifyToken, hasRole('admin', 'superadmin'), auditMiddleware, userController.listUsers);

// Ruta: obtener usuario autenticado (desde token → DB sin contraseña)
router.get('/me', verifyToken, auditMiddleware, async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.userId).select('-password');
    if (!dbUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ usuario: dbUser });
  } catch (error) {
    console.error("❌ Error en /me:", error.message);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

// Ruta protegida por roles: acceso a dashboard
router.get('/dashboard', verifyToken, auditMiddleware, hasRole('user', 'manager', 'admin'), userController.getDashboardLayout);
router.put(
  '/dashboard',
  verifyToken, auditMiddleware,
  hasRole('user', 'manager', 'admin'),
  validate(dashboardLayoutSchema),
  userController.saveDashboardLayout
);

module.exports = router;
