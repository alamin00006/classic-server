const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      productTitle: req.body.productTitle,

      categoryName: req.body.categoryName,

      description: req.body.description,
      sizeVariation: req.body.sizeVariation,
    });

    const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Product Upload Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Please give Product title Unique",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};

exports.getProductsDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};
