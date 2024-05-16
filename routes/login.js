const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

// Middleware para la ruta '/api/signup'
router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Necesitas completar todo",
      })
    );
  }

  const accesToken = "access_token";
  const refreshToken = "refresh_token";
  const user = {
    id: "1",
    name: "Daniel",
    username: "Danielito",
  };
  res.status(200).json(jsonResponse(200, { user, accesToken, refreshToken }));
});

module.exports = router;
