const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.addAddressValidator = [
  check("alias")
    .notEmpty()
    .withMessage("Alias required")
    .custom((val, { req }) =>
      User.findById(req.user._id).then((user) => {
        if (user.addresses.find((address) => address.alias === val)) {
          return Promise.reject(new Error("Alias already in use"));
        }
      })
    ),
  check("details").notEmpty().withMessage("Details required"),
  check("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  check("postalCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Invalid postal code"),

  validatorMiddleware,
];

exports.removeAddressValidator = [
  check("addressId").isMongoId().withMessage("Invalid address id format"),
  validatorMiddleware,
];
