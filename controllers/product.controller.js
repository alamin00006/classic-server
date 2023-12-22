const Product = require("../models/Product");

const Category = require("../models/Category");

exports.createProduct = async (req, res) => {
  try {
    const categoryParse = JSON.parse(req.body.category);

    const product = new Product({
      productName: req.body.productName,

      color: req.body.price,
      size: req.body.price,
      price: req.body.price,
      quantity: req.body.quantity,

      category: {
        categoryName: categoryParse.categoryName,
        category_id: categoryParse.category_id,
      },

      description: req.body.descriptionE,

      image: req.body.image,
    });
    const { _id: productId, category } = product;
    // in Category product Push
    await Category.updateOne(
      { _id: category.category_id },
      { $push: { products: productId } }
    );

    const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Product Upload Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Something is Wrong",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const productTotalCount = await Product.countDocuments({});
    const page = parseInt(req.query?.page);
    const size = parseInt(req.query?.size);

    if (page || size) {
      const products = await Product.find({})
        .skip(page * size)
        .limit(size);

      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: {
          products,
          productTotalCount,
        },
      });
    } else {
      const products = await Product.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: products,
      });
    }
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
    //     const query = {_id:ObjectId(id)};
    //    const products = await Product.findOne(query)
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
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

exports.updateProduct = async (req, res, next) => {
  try {
    // console.log(req?.files)
    const categoryParse = JSON.parse(req.body.category);
    const writerParse = JSON.parse(req.body.writer);
    const publicationParse = JSON.parse(req.body.publication);

    const { id } = req.params;

    const updateData = {
      nameB: req.body.nameB,
      nameE: req.body.nameE,
      price: req.body.price,
      quantity: req.body.quantity,
      discount: req.body.discount,
      status: req.body.status,
      category: {
        categoryName: categoryParse.categoryName,
        category_id: categoryParse.category_id,
      },
      writer: {
        writerName: writerParse.writerName,
        writer_id: writerParse.writer_id,
      },
      publication: {
        publicationName: publicationParse.publicationName,
        publication_id: publicationParse.publication_id,
      },
      bookFair: req.body.bookFair,
      descriptionB: req.body.descriptionB,
      writerDetails: req.body.writerDetails,
      BookSalesInfo: req.body.BookSalesInfo,
    };

    const result = await Product.updateOne(
      { _id: id },
      { $set: updateData },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not updated",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const imageData = req.body.image[0].split("\\")[2];
    // const pdfData = req.body.productPdf[0].split("\\")[2];

    // fs.readdir(dirPath, (err, files) => {
    //   const fileData = files.find((item) => item === imageData);

    //   fs.stat(`./public/uploads/${fileData}`, function (err, stats) {
    //     if (err) {
    //       return;
    //     }

    //     fs.unlink(`./public/uploads/${fileData}`, function (err) {
    //       if (err) return;
    //     });
    //   });
    // });
    // fs.readdir(dirPath, (err, pdfFiles) => {
    //   const pdfFile = pdfFiles.find((item) => item === pdfData);

    //   fs.stat(`./public/uploads/${pdfFile}`, function (err, stats) {
    //     if (err) {
    //       return;
    //     }

    //     fs.unlink(`./public/uploads/${pdfFile}`, function (err) {
    //       if (err) return;
    //     });
    //   });
    // });

    const result = await Product.findByIdAndDelete({ _id: id });

    await Category.findOneAndUpdate(
      { products: id },
      { $pull: { products: id } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "delete Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not updated",
      error: error.message,
    });
  }
};
