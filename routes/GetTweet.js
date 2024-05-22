const express = require("express");
const verificacion = require("../Verifiacion"); // Asegúrate de que esta ruta es correcta
const router = express.Router();
const admin = require("firebase-admin");
const { db } = require("../firebase"); // Asegúrate de que esta ruta es correcta

router.get("/", verificacion, async (req, res) => {
  try {
    // Obtener todos los tweets
    const tweetsSnapshot = await db.collection("tweets").get();
    const tweets = [];

    for (const doc of tweetsSnapshot.docs) {
      const tweetData = doc.data();
      const userId = tweetData.userId;

      // Obtener detalles del usuario
      const userSnapshot = await db.collection("contacts").doc(userId).get();
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        const username = userData.username;

        // Añadir los detalles del usuario al tweet
        tweets.push({
          id: doc.id,
          ...tweetData,
          username: username,
        });
      } else {
        tweets.push({
          id: doc.id,
          ...tweetData,
          username: null,
        });
      }
    }

    res.status(200).json(tweets);
  } catch (error) {
    console.error("Error fetching tweets and user details: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
