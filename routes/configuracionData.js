const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.post("/", verificacion, async (req, res) => {
  const userId = req.user.userId; //capturo el id del usuario

  try {
    // Extraer los campos a actualizar de req.body
    const { username, password, birthday, email } = req.body;
    const updatedFields = {};

    // Agregar los campos actualizados al objeto
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = password;
    if (birthday) updatedFields.birthday = birthday;
    if (email) updatedFields.email = email;

    // Actualizar el documento del usuario en Firestore
    await db.collection("contacts").doc(userId).update(updatedFields);

    res.status(200).json({
      message: "Datos Actualizados Correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    res.status(500).json({
      error: "Error al actualizar datos del usuario",
    });
  }
});

module.exports = router;
