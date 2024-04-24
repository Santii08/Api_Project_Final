const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.json());

app.get("/inicio", (req, res) => {
  const name = "Daniel Santiago";
  res.json(name);
});
app.listen(PORT, () =>
  console.log(`This api in running on http://localhost:${PORT}`)
);
