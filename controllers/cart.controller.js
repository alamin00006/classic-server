const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
  try {
    const carts = await Cart.findOne({ productId: req?.body?.productId });
    console.log(carts);
    if (carts) {
      return res.status(400).json({
        status: "failed",
        message: "Sorry! Already Added to Cart",
      });
    }

    const cart = new Cart(req.body);
    const result = await cart.save();

    res.status(200).json({
      status: "success",
      message: "Wow ! Your Product Added to Cart",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Somehting Wrong",
      error: error.message,
    });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = req.params.user;
    console.log(user);
    const carts = await Cart.find({ userId: user });

    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: carts,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry ! Not fount Data",
      error: error.message,
    });
  }
};
