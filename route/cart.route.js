const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
router.route("/").post(cartController.createCart);

router.route("/:user").get(cartController.getUserCart);

module.exports = router;
