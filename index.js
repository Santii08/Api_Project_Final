const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

require("dotenv").config();

const PORT = 8080;

app.use(express.json());
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

// Corrección en las rutas de los módulos
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/refreshToken", require("./routes/refreshToken"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/user", require("./routes/user"));

app.get("/inicio", (req, res) => {
  const name = "Daniel Santiago";
  res.json(name);
});

app.listen(PORT, () =>
  console.log(`Esta API está corriendo en http://localhost:${PORT}`)
);
