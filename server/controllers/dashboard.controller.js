const mongoose = require("mongoose");
const DashboardConfig = require("../models/UserDashboardConfig");

const saveUserWidgets = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "ID de usuario inválido" });
  }

  const { widgets } = req.body;

  try {
    let config = await DashboardConfig.findOne({ userId });

    if (!config) {
      config = new DashboardConfig({ userId, widgets });
    } else {
      config.widgets = widgets;
    }

    await config.save();

    res.json({
      success: true,
      data: config.widgets,
      message: "Widgets guardados correctamente"
    });
  } catch (error) {
    console.error("Error al guardar widgets:", error.message);
    res.status(500).json({
      success: false,
      message: "Error al guardar configuración de widgets"
    });
  }
};

const getUserWidgets = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "ID de usuario inválido" });
  }

  try {
    const config = await DashboardConfig.findOne({ userId });
    if (!config) {
      return res.json({ success: true, data: [], message: "Sin widgets aún" });
    }

    res.json({ success: true, data: config.widgets });
  } catch (error) {
    console.error("Error al cargar widgets:", error.message);
    res.status(500).json({ success: false, message: "Error al cargar widgets" });
  }
};

module.exports = {
  saveUserWidgets,
  getUserWidgets
};
