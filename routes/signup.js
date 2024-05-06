const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

// Middleware para la ruta '/api/signup'
router.post("/", (req, res) => {
  const { name, birthday, email, username, password } = req.body;
  if (!name || !birthday || !email || !username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Necesitas completar todo",
      })
    );
  }
  res
    .status(200)
    .json(jsonResponse(200, { message: "Usario creado correctamente" }));
});

module.exports = router;
