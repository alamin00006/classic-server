const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// routes
// const productRoute = require("./routes/product.route");

// app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error");
  }
});
module.exports = app;
