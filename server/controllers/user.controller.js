const User = require('../models/User');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

// Tabla de jerarquía de roles
const roleHierarchy = {
  superadmin: 6,
  admin: 5,
  manager: 4,
  analyst: 3,
  viewer: 2,
  user: 1
};

// POST /api/users - Crear nuevo usuario con rol
exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password y rol son requeridos." });
    }

    const creatorRole = req.user.role;
    if (role === 'superadmin') {
      return res.status(403).json({ message: "No se permite crear usuarios superadmin por seguridad." });
    }

    if (roleHierarchy[creatorRole] <= roleHierarchy[role]) {
      return res.status(403).json({ message: "No tienes permisos para crear usuarios con ese rol." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Ya existe un usuario con ese email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    logger.info(`👤 Usuario creado (${role}) por ${creatorRole}: ${email}`);
    res.status(201).json({ message: "Usuario creado exitosamente.", userId: newUser._id });
  } catch (error) {
    logger.error("❌ Error al crear usuario:", error.message);
    res.status(500).json({ message: "Error interno al crear usuario." });
  }
};

exports.getDashboardLayout = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      logger.warn(`⚠️ Usuario no encontrado: ${req.user.userId}`);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    logger.info(`📐 Layout cargado para userId: ${req.user.userId}`);
    res.json({ layout: user.dashboardLayout });
  } catch (error) {
    logger.error(`❌ Error al obtener layout (userId: ${req.user.userId}): ${error.message}`);
    res.status(500).json({ message: 'Error al obtener el layout' });
  }
};

exports.saveDashboardLayout = async (req, res) => {
  try {
    const { layout } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { dashboardLayout: layout },
      { new: true }
    );
    logger.info(`💾 Layout guardado para userId: ${req.user.userId}`);
    res.json({ message: 'Layout guardado correctamente', layout: user.dashboardLayout });
  } catch (error) {
    logger.error(`❌ Error al guardar layout (userId: ${req.user.userId}): ${error.message}`);
    res.status(500).json({ message: 'Error al guardar el layout' });
  }
};

// GET /api/users - Solo admin o superadmin
exports.listUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const query = role ? { role } : {};

    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
