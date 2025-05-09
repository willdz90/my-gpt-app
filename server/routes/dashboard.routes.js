const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");

const {
  saveUserWidgets,
  getUserWidgets
} = require("../controllers/dashboard.controller");

router.post("/widgets", verifyToken, saveUserWidgets);
router.get("/widgets", verifyToken, getUserWidgets);

module.exports = router;
