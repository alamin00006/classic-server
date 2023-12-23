const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = mongoose.Schema({
  productId: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
