// middlewares/verificacion.js
const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("./Settings/Keys");

const verificacion = express.Router();

verificacion.use((req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).send({
      error: "Es necesario un token de autenticación",
    });
  }

  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  jwt.verify(tokenWithoutBearer, keys.key, (error, decoded) => {
    if (error) {
      return res.json({
        message: "Token no válido",
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

module.exports = verificacion;
