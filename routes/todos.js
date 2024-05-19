const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();

// Middleware para la ruta '/api/signup'
router.get("/", verificacion, (req, res) => {
  res.send("todos");
});

module.exports = router;
