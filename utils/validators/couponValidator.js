const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Coupon = require("../../models/couponModel");

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("Coupon name required")
    .isLength({ min: 3 })
    .withMessage("Too short Coupon name")
    .isLength({ max: 32 })
    .withMessage("Too long Coupon name")
    .custom((value) =>
      Coupon.findOne({ name: value }).then((coupon) => {
        if (coupon) {
          return Promise.reject(new Error("Coupon name already exists"));
        }
      })
    ),

  check("expire")
    .notEmpty()
    .withMessage("Coupon expire time required")
    .isISO8601()
    .withMessage("Invalid date format"),
  check("discount")
    .notEmpty()
    .withMessage("Coupon discount value required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount value must be number between 0 to 100"),
  validatorMiddleware,
];

exports.getCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id format"),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id format"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Too short Coupon name")
    .isLength({ max: 32 })
    .withMessage("Too long Coupon name")
    .custom((value) =>
      Coupon.findOne({ name: value }).then((coupon) => {
        if (coupon) {
          return Promise.reject(new Error("Coupon name already exists"));
        }
      })
    ),
  check("expire").optional().isISO8601().withMessage("Invalid date format"),
  check("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount value must be number between 0 to 100"),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id format"),
  validatorMiddleware,
];
