const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(`🛑 Error no gestionado en ${req.method} ${req.originalUrl}: ${err.message}`);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
