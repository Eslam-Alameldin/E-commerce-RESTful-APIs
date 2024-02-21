const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createCashOrderValidator = [
  check("cartId").isMongoId().withMessage("Invalid cart id format"),
  check("shippingAddress")
    .optional()
    .isObject()
    .withMessage("shippingAddress must be an object"),
  check("shippingAddress.details")
    .optional()
    .isString()
    .withMessage("shippingAddress.details must be a string"),
  check("shippingAddress.phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
  check("shippingAddress.city")
    .optional()
    .isString()
    .withMessage("shippingAddress.city must be a string"),
  check("shippingAddress.postalCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Invalid postal code"),
  validatorMiddleware,
];

exports.checkoutSessionValidator = [
  check("cartId").isMongoId().withMessage("Invalid cart id format"),
  validatorMiddleware,
];

exports.updateOrderToPaidValidator = [
  check("id").isMongoId().withMessage("Invalid order id format"),
  validatorMiddleware,
];

exports.updateOrderToDeliveredValidator = [
  check("id").isMongoId().withMessage("Invalid order id format"),
  validatorMiddleware,
];

exports.findSpecificOrderValidator = [
  check("id").isMongoId().withMessage("Invalid order id format"),
  validatorMiddleware,
];
