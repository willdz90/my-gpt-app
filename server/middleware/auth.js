const jwt = require('jsonwebtoken');

// Middleware principal: verificar token
function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.warn("🛑 Acceso bloqueado: no se proporcionó token.");
    return res.status(401).json({ message: 'Acceso denegado. Token requerido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      return res.status(403).json({ message: 'Token inválido: userId faltante.' });
    }
    req.user = {
      userId: decoded.userId,
      role: decoded.role || "usuario"
    };
    next();
  } catch (err) {
    console.error("❌ Fallo en verificación JWT:", err.message);
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
}

// Middleware adicional: control de roles
function hasRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      console.warn(`⛔ Rol denegado: ${req.user?.role}`);
      return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
    }
    next();
  };
}

module.exports = {
  verifyToken,
  hasRole
};
