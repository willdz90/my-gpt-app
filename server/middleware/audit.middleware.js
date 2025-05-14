const AuditLog = require('../models/auditLog.model');
const { getClientIp } = require('request-ip');

/**
 * Middleware para registrar auditoría de cada solicitud
 * Solo se activa en rutas autenticadas.
 */
module.exports = async (req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;

  res.send = async function (body) {
    const duration = Date.now() - start;
    try {
      await AuditLog.create({
        user: req.user?.userId || null,
        method: req.method,
        route: req.originalUrl,
        statusCode: res.statusCode,
        body: req.body,
        query: req.query,
        ip: getClientIp(req),
        duration,
        timestamp: new Date()
      });
    } catch (err) {
      console.error('Audit log failed:', err.message);
    }
    return originalSend.call(this, body);
  };

  next();
};
