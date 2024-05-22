const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/tweet'
router.put("/:tweetId", verificacion, async (req, res) => {
  const userId = req.user.userId; // Captura el ID del usuario
  const tweetId = req.params.tweetId; // Captura el ID del tweet a actualizar

  try {
    // Extraer los campos a actualizar del cuerpo de la solicitud
    const { text, hashtag, topic } = req.body;
    const updatedFields = {};

    // Agregar los campos actualizados al objeto
    if (text) updatedFields.text = text;
    if (hashtag) updatedFields.Hashtag = hashtag;

    // Verificar si el tweet pertenece al usuario actual
    const tweetDoc = await db.collection("tweets").doc(tweetId).get();

    if (!tweetDoc.exists) {
      return res.status(404).json({ error: "Tweet no encontrado" });
    }

    if (tweetDoc.data().userId !== userId) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para actualizar este tweet" });
    }

    // Actualizar el documento del tweet en Firestore
    await db.collection("tweets").doc(tweetId).update(updatedFields);

    res.status(200).json({
      message: "Tweet actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el tweet:", error);
    res.status(500).json({
      error: "Error al actualizar el tweet",
    });
  }
});

module.exports = router;
