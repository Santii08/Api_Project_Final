const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.post("/", async (req, res) => {
  const { name, birthday, email, username, password } = req.body;
  if (!name || !birthday || !email || !username || !password) {
    return res.status(400).json({
      error: "Necesitas completar todos los campos",
    });
  }
  await db.collection("contacts").add({
    name,
    username,
    password,
    birthday,
    email,
  });
  res.status(200).json({
    message: "Nuevo usuario creado correctamente",
  });
});

module.exports = router;
