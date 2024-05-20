const express = require("express");

const router = express.Router();
const { db } = require("../firebase");
const { get } = require("mongoose");
const { QueryPartition } = require("firebase-admin/firestore");
// Middleware para la ruta '/api/signup'
router.get("/", async (req, res) => {
  const querySnapshot = await db.collection("contacts").get();
  res.send(querySnapshot.docs[0].data());
});

module.exports = router;
