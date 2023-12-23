const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./route/product.route");

const cartRoute = require("./route/cart.route");
const userRoute = require("./route/user.route");

app.use("/api/product", productRoute);

app.use("/api/cart", cartRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Route is working!");
});
app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error");
  }
});
module.exports = app;
