// server/utils/validators.js
const { check } = require('express-validator');

exports.validateRegister = [
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({ min: 6 }).withMessage('Contraseña mínima de 6 caracteres')
];

exports.validateAnalysis = [
  check('nombre').notEmpty().withMessage('El nombre del producto es requerido'),
  check('descripcion').notEmpty().withMessage('La descripción es obligatoria')
];
