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
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: false }));

// Corrección en las rutas de los módulos
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/refreshToken", require("./routes/refreshToken"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/user", require("./routes/user"));
app.use("/api/create", require("./routes/crearTweet"));
app.use("/api/loginpr", require("./routes/loginpr"));
app.use("/api/signuppr", require("./routes/signuppr"));
app.use("/api/data", require("./routes/configuracionData"));
app.use("/api/home", require("./routes/home"));
app.use("/api/info", require("./routes/Getinfo"));
app.use("/api/tweet", require("./routes/GetTweet"));
app.use("/api/like", require("./routes/likes"));
app.use("/api/nLikes", require("./routes/numeroLikes"));

app.get("/inicio", (req, res) => {
  const name = "Daniel Santiago";
  res.json(name);
});

app.listen(PORT, () =>
  console.log(`Esta API está corriendo en http://localhost:${PORT}`)
);
