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
      return res.status(403).send({
        message: "Token no válido",
      });
    } else {
      req.user = decoded; // Cambia req.decoded a req.user
      next();
    }
  });
});

module.exports = verificacion;
