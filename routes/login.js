const express = require("express");
const fs = require("fs");
const path = require("path");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

// Ruta del archivo JSON donde se guardan los usuarios
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// Middleware para la ruta '/api/login'
router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Usuarios o Contraseña incorrecta",
      })
    );
  }

  // Lee el contenido actual del archivo JSON
  let usuarios = [];
  try {
    const usuariosData = fs.readFileSync(usersFilePath);
    usuarios = JSON.parse(usuariosData);
  } catch (error) {
    // Si hay un error al leer el archivo, retorna un error
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error interno del servidor al intentar leer los usuarios",
      })
    );
  }

  // Busca el usuario en la lista de usuarios
  const usuarioEncontrado = usuarios.find(
    (user) => user.username === username && user.password === password
  );

  if (!usuarioEncontrado) {
    // Si el usuario no se encuentra, retorna un error de credenciales inválidas
    return res.status(401).json(
      jsonResponse(401, {
        error: "Credenciales inválidas",
      })
    );
  }
  const usuarioAutenticado = usuarioEncontrado;
  // Si el usuario se encuentra, retorna éxito con un mensaje opcional
  res.status(200).json(
    jsonResponse(200, {
      message: "Usuario autenticado correctamente",
      usuario: usuarioAutenticado,
    })
  );
});

module.exports = router;
