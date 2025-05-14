const express = require('express');
const router = express.Router();
const { verifyToken, hasRole } = require('../middleware/auth');
const AuditLog = require('../models/auditLog.model');

router.get('/logs', verifyToken, hasRole('admin'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      user = '',
      method = '',
      route = '',
      ids = ''
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};

    if (ids) {
      query._id = { $in: ids.split(',') };
    } else {
      if (method) query.method = { $regex: new RegExp(method, 'i') };
      if (route) query.route = { $regex: new RegExp(route, 'i') };
    }

    let baseQuery = AuditLog.find(query).populate('user', 'email');

    let [allLogs, total] = await Promise.all([
      baseQuery.skip(skip).limit(parseInt(limit)),
      AuditLog.countDocuments(query)
    ]);

    if (user) {
      allLogs = allLogs.filter(log => (log.user?.email || '').toLowerCase().includes(user.toLowerCase()));
      total = allLogs.length;
    }

    res.json({ success: true, logs: allLogs, total });
  } catch (error) {
    console.error('❌ Error al obtener logs de auditoría:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

router.get('/methods', verifyToken, hasRole('admin'), async (req, res) => {
  try {
    const methods = await AuditLog.distinct("method");
    const filtered = methods.filter(Boolean).map(m => m.toUpperCase()).sort();
    res.json({ success: true, methods: filtered });
  } catch (error) {
    console.error("❌ Error al obtener métodos únicos:", error.message);
    res.status(500).json({ success: false, message: "Error al obtener métodos" });
  }
});

module.exports = router;
