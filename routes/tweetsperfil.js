const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

router.get("/:userId", verificacion, async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    const tweetsSnapshot = await db
      .collection("tweets")
      .where("userId", "==", userId)
      .get();

    const tweets = [];

    for (const doc of tweetsSnapshot.docs) {
      const tweetData = doc.data();

      const userSnapshot = await db.collection("contacts").doc(userId).get();
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        const username = userData.username;

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

    if (tweets.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron tweets para este usuario" });
    }

    res.status(200).json(tweets);
  } catch (error) {
    console.error("Error fetching tweets and user details: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
