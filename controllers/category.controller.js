const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const result = await category.save();

    res.status(200).json({
      status: "success",
      message: "Wow ! Your Category Succefully Added",
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

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry ! Not fount Data",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Category.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Thanks Updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Something Wrong",
      error: error.message,
    });
  }
};
