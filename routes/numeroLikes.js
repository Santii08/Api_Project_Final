const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();

// Middleware para la ruta '/api/signup'
router.get("/likes", verificacion, async (req, res) => {
  try {
    const likesSnapshot = await db.collection("likes").get();
    const likesMap = {};

    likesSnapshot.forEach((doc) => {
      const { tweetId } = doc.data();
      if (tweetId in likesMap) {
        likesMap[tweetId]++;
      } else {
        likesMap[tweetId] = 1;
      }
    });

    res.status(200).json(likesMap);
  } catch (error) {
    console.error("Error fetching likes: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
