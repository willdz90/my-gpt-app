const express = require("express");
const router = express.Router();
const { verifyToken, hasRole } = require("../middleware/auth");
const { ejecutarQuery } = require("../controllers/query.controller");
const validate = require("../middleware/validate");
const { queryEjecutarSchema } = require("../validators/query.validator");

router.post(
  "/ejecutar",
  verifyToken,
  hasRole("analyst", "manager", "admin"),
  validate(queryEjecutarSchema),
  ejecutarQuery
);

module.exports = router;
