const express = require("express");
const fs = require("fs");
const path = require("path");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();
const verificacion = require("../Verifiacion");

// Ruta del directorio y archivo JSON donde se guardarán los usuarios
const dataDirectory = "../data";
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// Función para verificar si el directorio existe y crearlo si no
function verificarDirectorio() {
  try {
    fs.accessSync(path.join(__dirname, "..", "data"));
  } catch (error) {
    if (error.code === "ENOENT") {
      // El directorio no existe, así que intenta crearlo
      fs.mkdirSync(path.join(__dirname, "..", "data"));
    } else {
      throw error;
    }
  }
}

// Verifica la existencia del directorio al inicio
verificarDirectorio();

// Función para guardar un nuevo usuario en el archivo JSON
function guardarUsuario(usuario) {
  // Lee el contenido actual del archivo JSON
  let usuarios = [];
  try {
    const usuariosData = fs.readFileSync(usersFilePath);
    usuarios = JSON.parse(usuariosData);
  } catch (error) {
    // Si hay un error al leer el archivo, asume que aún no hay usuarios y continúa
  }

  // Agrega el nuevo usuario a la lista
  usuarios.push(usuario);

  // Guarda la lista actualizada de usuarios en el archivo JSON
  fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, 2));
}

// Middleware para la ruta '/api/signup'
router.post("/", verificacion, (req, res) => {
  const { name, birthday, email, username, password } = req.body;
  if (!name || !birthday || !email || !username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Necesitas completar todos los campos",
      })
    );
  }

  // Guarda el usuario en el archivo JSON
  guardarUsuario({ name, birthday, email, username, password });

  res
    .status(200)
    .json(jsonResponse(200, { message: "Usuario creado correctamente" }));
});

module.exports = router;
