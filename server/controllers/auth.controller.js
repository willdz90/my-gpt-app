const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

function generateAccessToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

function setRefreshCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'Strict' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

exports.register = async (req, res) => {
  const { email, password } = req.body; // ⚠️ Ignoramos req.body.role
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      logger.warn(`🔁 Intento de registro duplicado: ${email}`);
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role: 'user' }); // 🔐 Forzamos rol a 'user'
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    setRefreshCookie(res, refreshToken);

    logger.info(`✅ Registro exitoso: ${email}`);
    res.json({ token: accessToken });
  } catch (err) {
    logger.error(`❌ Error en registro: ${err.message}`);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`❌ Login fallido (usuario no existe): ${email}`);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn(`❌ Login fallido (contraseña incorrecta): ${email}`);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    logger.info(`🔐 Login exitoso: ${email}`);
    res.json({ token: accessToken, role: user.role, email: user.email });
  } catch (err) {
    console.error("❌ Error interno en login:", err);
    res.status(500).json({ message: 'Error interno al iniciar sesión' });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    logger.warn('⛔ Refresh token no enviado');
    return res.status(401).json({ message: 'Token no enviado' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
    logger.info(`♻️ Token de acceso renovado para: ${decoded.userId}`);
    res.json({ token: accessToken });
  } catch (err) {
    logger.warn(`⛔ Token de refresh inválido: ${err.message}`);
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  logger.info('🚪 Usuario cerró sesión');
  res.json({ message: 'Sesión cerrada' });
};
