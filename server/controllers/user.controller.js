// server/controllers/user.controller.js
const User = require('../models/User');

exports.getDashboardLayout = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ layout: user.dashboardLayout });
  } catch (error) {
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
    res.json({ message: 'Layout guardado correctamente', layout: user.dashboardLayout });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el layout' });
  }
};
