const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.post("/", verificacion, async (req, res) => {
  const { tweet, hashtag, topic } = req.body; // Obtener parámetros del cuerpo de la solicitud
  const userId = req.user.userId; //capturo el id del usuario

  // Validar que el campo "topic" esté presente en la solicitud
  if (!topic) {
    return res.status(400).json({ error: "El campo 'topic' es obligatorio" });
  }

  // Validar que el campo "tweet" esté presente en la solicitud
  if (!tweet) {
    return res.status(400).json({ error: "El campo 'tweet' es obligatorio" });
  }

  try {
    // Crea un nuevo documento en la colección "tweets" con el tweet y el ID del usuario
    await db.collection("tweets").add({
      userId: userId,
      text: tweet,
      Hashtag: hashtag,
      topic: topic,
    });

    // Mensaje de salida en caso exitoso
    const response = {
      message: "Tweet agregado exitosamente",
      userId,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al agregar el tweet:", error);
    res.status(500).json({ error: "Error al agregar el tweet" });
  }
});

module.exports = router;

