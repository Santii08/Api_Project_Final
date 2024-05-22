const express = require("express");
const verificacion = require("../Verifiacion"); // Asegúrate de que esta ruta es correcta
const router = express.Router();
const { db } = require("../firebase"); // Asegúrate de que esta ruta es correcta

// Ruta para obtener tweets de un usuario específico basado en su ID
router.get("/:userId", verificacion, async (req, res) => {
  const { userId } = req.params; // Captura el userId de los parámetros de la ruta

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    // Obtener todos los tweets del usuario especificado
    const tweetsSnapshot = await db
      .collection("tweets")
      .where("userId", "==", userId)
      .get();
    const tweets = [];

    for (const doc of tweetsSnapshot.docs) {
      const tweetData = doc.data();

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
