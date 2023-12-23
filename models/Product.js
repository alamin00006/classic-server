const mongoose = require("mongoose");

// Schema Design
const variationSizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can't be negative"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity can't be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
    },
    message: "Quantity must be an Integer",
  },
  photos: {
    type: [String],
  },
});
const productSchema = mongoose.Schema(
  {
    productTitle: {
      type: String,
      trim: true,
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    sizeVariation: [variationSizeSchema],
  },
  {
    timestamps: true,
  }
);

// Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
