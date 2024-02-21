const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productModel");

exports.addProductToWishlistValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom((productId) =>
      Product.findById(productId).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No product for this id: ${productId}`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.removeProductFromWishlistValidator = [
  check("productId").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];
