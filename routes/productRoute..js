const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductsImages,
} = require("../services/productService");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    uploadProductImages,
    resizeProductsImages,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    uploadProductImages,
    resizeProductsImages,
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
