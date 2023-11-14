const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long")
    .isLength({ max: 32 })
    .withMessage("Name must be at most 32 chars long"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validatorMiddleware,
];
