const mongoose = require("mongoose");
const DashboardConfig = require("../models/UserDashboardConfig");
const logger = require("../utils/logger");

const saveUserWidgets = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    logger.warn("❌ ID de usuario inválido en saveUserWidgets");
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

    logger.info(`✅ Widgets guardados para userId: ${userId} (${widgets.length} widgets)`);
    res.json({
      success: true,
      data: config.widgets,
      message: "Widgets guardados correctamente"
    });
  } catch (error) {
    logger.error(`❌ Error al guardar widgets (userId: ${userId}): ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error al guardar configuración de widgets"
    });
  }
};

const getUserWidgets = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    logger.warn("⚠️ ID de usuario inválido en getUserWidgets");
    return res.status(400).json({ success: false, message: "ID de usuario inválido" });
  }

  try {
    const config = await DashboardConfig.findOne({ userId });

    if (!config) {
      logger.info(`📭 Usuario sin widgets todavía (userId: ${userId})`);
      return res.json({ success: true, data: [], message: "Sin widgets aún" });
    }

    logger.info(`📦 Widgets cargados para userId: ${userId}`);
    res.json({ success: true, data: config.widgets });
  } catch (error) {
    logger.error(`❌ Error al cargar widgets (userId: ${userId}): ${error.message}`);
    res.status(500).json({ success: false, message: "Error al cargar widgets" });
  }
};

module.exports = {
  saveUserWidgets,
  getUserWidgets
};
