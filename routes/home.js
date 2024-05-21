const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.post("/", verificacion, async (req, res) => {
  const { Tweet } = req.body; // Obtener parámetros del cuerpo de la solicitud
  const { likes } = req.body;
  const userId = req.user.userId; //capturo el id del usuario

  if (!Tweet) {
    return res.status(400).send({ error: "Completa el Tweet" });
  }

  try {
    // Crea un nuevo documento en la colección "tweets" con el tweet y el ID del usuario
    await db.collection("tweets").add({
      text: Tweet,
      userId: userId,
      NuLikes: likes,
    });

    // Mensaje de salida en caso exitoso
    const response = {
      message: "Tweet agregado exitosamente",
      userId,
      likes,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al agregar el tweet:", error);
    res.status(500).send({ error: "Error al agregar el tweet" });
  }
});

module.exports = router;
