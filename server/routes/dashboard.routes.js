const express = require("express");
const router = express.Router();
const {
  saveUserWidgets,
  getUserWidgets
} = require("../controllers/dashboard.controller");
const { verifyToken, hasRole } = require("../middleware/auth");
const validate = require('../middleware/validate');
const { userWidgetsSchema } = require('../validators/widgets.validator');


// POST /api/dashboard/widgets → Guardar widgets del usuario autenticado
router.post(
  "/widgets",
  verifyToken,
  hasRole("user", "manager", "admin"),
  validate(userWidgetsSchema),
  saveUserWidgets
);


// GET /api/dashboard/widgets → Obtener widgets del usuario autenticado
router.get("/widgets", verifyToken, hasRole("user", "manager", "admin"), getUserWidgets);

module.exports = router;
