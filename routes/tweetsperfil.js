const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const admin = require("firebase-admin");
const { db } = require("../firebase"); // Asegúrate de que esta ruta es correcta

// Middleware para la ruta '/api/signup'
router.get("/tweets/:userId", verificacion, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Consulta en la base de datos para obtener los tweets del usuario
    const tweetsSnapshot = await db
      .collection("tweets")
      .where("userId", "==", userId)
      .get();
    const tweets = [];

    tweetsSnapshot.forEach((doc) => {
      const tweetData = doc.data();
      tweets.push({
        id: doc.id,
        username: tweetData.username,
        text: tweetData.text,
        likes: tweetData.likes || 0, // Puedes ajustar esto según la estructura real de tus tweets
      });
    });

    res.status(200).json(tweets);
  } catch (error) {
    console.error("Error fetching tweets by user ID: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
