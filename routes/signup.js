const express = require("express");
const { jsonResponse } = require("../lib/jsonresponse");
const router = express.Router();

// Middleware para la ruta '/api/signup'
router.post("/", (req, res) => {
  const { username, name, password } = req.body;
  if (!!username || !!name || !!password) {
    return res.status(400).json(
      jsonResponse(400, {
        errror: "Necesitas completar todo",
      })
    );
  }
  res
    .status(200)
    .json(jsonResponse(200, { message: "Usario creado correctamente" }));
  res.send("signup");
});

module.exports = router;
