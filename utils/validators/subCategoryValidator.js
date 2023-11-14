const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];

exports.getSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
