const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long")
    .isLength({ max: 32 })
    .withMessage("Name must be at most 32 chars long"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validatorMiddleware,
];
