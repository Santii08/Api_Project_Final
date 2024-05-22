const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.get("/", verificacion, async (req, res) => {
  try {
    const userId = req.user.userId; // Captura el ID del usuario autenticado
    const userDoc = await db.collection("contacts").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Accede a los datos del usuario y envíalos en la respuesta
    const userData = userDoc.data();
    res.send(userData);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
