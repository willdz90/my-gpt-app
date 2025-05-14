const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  method: String,
  route: String,
  statusCode: Number,
  body: mongoose.Schema.Types.Mixed,
  query: mongoose.Schema.Types.Mixed,
  ip: String,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
});

// Índices para mejorar rendimiento de búsqueda y orden
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ method: 1 });
auditLogSchema.index({ route: 1 });
auditLogSchema.index({ statusCode: 1 });
auditLogSchema.index({ ip: 1 });
auditLogSchema.index({ duration: 1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
