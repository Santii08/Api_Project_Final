const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verificacion = require("../Verifiacion"); // Asegúrate de tener tu middleware de verificación de usuario

// Endpoint para eliminar un tweet por su ID
router.delete("/:tweetId", verificacion, async (req, res) => {
  const userId = req.user.userId; // ID del usuario autenticado
  const tweetId = req.params.tweetId; // ID del tweet a eliminar

  try {
    // Verificar si el tweet existe y pertenece al usuario antes de eliminarlo
    const tweetRef = db.collection("tweets").doc(tweetId);
    const tweetDoc = await tweetRef.get();

    if (!tweetDoc.exists) {
      return res.status(404).json({ error: "Tweet no encontrado" });
    }

    const tweetData = tweetDoc.data();

    if (tweetData.userId !== userId) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para eliminar este tweet" });
    }

    // Eliminar el tweet de la colección
    await tweetRef.delete();

    res.status(204).send(); // Envía una respuesta sin contenido
  } catch (error) {
    console.error("Error al eliminar el tweet:", error);
    res.status(500).json({ error: "Error al eliminar el tweet" });
  }
});

module.exports = router;
