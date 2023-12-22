const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/:id").patch(productController.updateProduct);
router
  .route("/:id")
  .get(productController.getProductsDetails)
  // router.route('/').get(productController.getAllProductsManage)
  .delete(productController.deleteProduct);

module.exports = router;
