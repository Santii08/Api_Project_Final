const express = require("express");

const router = express.Router();
const { db } = require("../firebase");
const jwt = require("jsonwebtoken");
const keys = require("../Settings/Keys");

// Middleware para la ruta '/api/signup'
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body; // Obtener parámetros del cuerpo de la solicitud

    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required" });
    }

    const querySnapshot = await db
      .collection("contacts")
      .where("username", "==", username)
      .where("password", "==", password)
      .get();

    if (querySnapshot.empty) {
      return res.status(404).send({ error: "No matching documents found" });
    }

    const userData = querySnapshot.docs.map((doc) => doc.data());
    const user = userData[0];
    const userId = querySnapshot.docs[0].id;

    const payload = {
      check: true,
      username: user.username,
      userId: userId,
    };

    const token = jwt.sign(payload, keys.key, { expiresIn: "1h" });

    res.status(200).json({
      message: "User authenticated successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request" });
  }
});

module.exports = router;
