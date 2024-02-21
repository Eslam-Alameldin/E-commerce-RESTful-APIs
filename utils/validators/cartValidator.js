const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");



exports.addProductToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("ProductId required")
    .isMongoId()
    .withMessage("Invalid product id format"),
  check("color")
    .notEmpty()
    .withMessage("Color required")
    .isString()
    .withMessage("Color must be a string"),
  validatorMiddleware,
];

exports.updateCartItemQuantityValidator = [
  check("itemId")
    .notEmpty()
    .withMessage("Item id required")
    .isMongoId()
    .withMessage("Invalid item id format"),
  check("quantity")
    .notEmpty()
    .withMessage("Quantity required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a number and greater than 0"),
  validatorMiddleware,
];

exports.applyCouponValidator = [
  check("coupon")
    .notEmpty()
    .withMessage("Coupon required")
    .isString()
    .withMessage("Coupon must be a string"),
  validatorMiddleware,
];

exports.removeSpecificCartItemValidator = [
  check("itemId")
    .notEmpty()
    .withMessage("Item id required")
    .isMongoId()
    .withMessage("Invalid item id format"),
  validatorMiddleware,
];
