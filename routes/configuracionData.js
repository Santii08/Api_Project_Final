const express = require("express");
const verificacion = require("../Verifiacion");
const router = express.Router();
const { db } = require("../firebase");

// Middleware para la ruta '/api/signup'
router.get("/:id", async (req, res) => {
  /*const doc = await db.collection("contacts").doc(req.params.id).get();
  res.status(200).json({
    id: doc.id,
    ...doc.data(),
  });*/
  const { id } = req.params;
  await db.collection("contacts").doc(id).update(req.body);
  res.status(200).json({
    message: "Datos Actualizados Correctamente",
  });
});

module.exports = router;
