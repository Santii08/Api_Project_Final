const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.get("/:topic", verificacion,async (req, res) => {
  const { topic } = req.params;

  try {
    // Buscar tweets por topic en la base de datos
    const tweetsRef = await db
      .collection("tweets")
      .where("topic", "==", topic)
      .get();
    const tweets = [];

    tweetsRef.forEach((doc) => {
      const tweetData = doc.data();
      tweets.push({
        id: doc.id,
        ...tweetData,
      });
    });

    res.status(200).json(tweets);
  } catch (error) {
    console.error("Error al buscar tweets por topic:", error);
    res.status(500).json({ error: "Error al buscar tweets por topic" });
  }
});

module.exports = router;
