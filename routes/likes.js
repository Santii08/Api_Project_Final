const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verificacion = require("../Verifiacion");

// Middleware para la ruta '/api/like'
router.post("/", verificacion, async (req, res) => {
  const { tweetId } = req.body; // Obtener el ID del tweet de los parámetros de la ruta
  const userId = req.user.userId; // Capturar el ID del usuario

  try {
    // Verificar si el tweet existe
    const tweetRef = await db.collection("tweets").doc(tweetId).get();
    if (!tweetRef.exists) {
      return res.status(404).send({ error: "El tweet no existe" });
    }

    // Obtener el número actual de likes del tweet
    const tweetData = tweetRef.data();
    let currentLikes = tweetData.likes || 0;

    // Verificar si el usuario ya dio like al tweet
    const likesRef = await db
      .collection("likes")
      .where("userId", "==", userId)
      .where("tweetId", "==", tweetId)
      .get();
    if (!likesRef.empty) {
      return res.status(400).send({ error: "Ya has dado like a este tweet" });
    }

    // Incrementar el contador de likes del tweet
    currentLikes++;

    // Actualizar el número de likes del tweet en la base de datos
    await db.collection("tweets").doc(tweetId).update({ likes: currentLikes });

    // Registrar el like del usuario en la colección "likes"
    await db.collection("likes").add({
      userId: userId,
      tweetId: tweetId,
    });

    // Mensaje de salida en caso exitoso
    const response = {
      message: "Like agregado exitosamente al tweet",
      tweetId,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al agregar el like al tweet:", error);
    res.status(500).send({ error: "Error al agregar el like al tweet" });
  }
});

module.exports = router;
