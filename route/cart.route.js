const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
router.route("/").post(cartController.createCart).get(cartController.getCart);

// router.route("/:id");
//   .get(cartController.getCategoryDetails)
//   .patch(cartController.updateCategory);

module.exports = router;
