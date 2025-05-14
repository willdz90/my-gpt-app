const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout } = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

// Registro de usuario
router.post('/register', validate(registerSchema), register);

// Login de usuario
router.post('/login', validate(loginSchema), login);

// Renovar token
router.post('/refresh-token', refreshToken);

// Cerrar sesión
router.post('/logout', logout);

module.exports = router;
