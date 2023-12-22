const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// Schema Design
const productSchema = mongoose.Schema(
  {
    productTitle: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    color: {
      type: String,

      trim: true,
      required: true,
    },
    size: {
      type: String,
      trim: true,
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

    category: {
      categoryName: {
        type: String,
        required: true,
      },
      category_id: {
        type: ObjectId,
        ref: "Category",
        required: true,
      },
    },

    description: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
