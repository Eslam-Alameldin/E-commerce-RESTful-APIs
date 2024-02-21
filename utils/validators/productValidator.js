/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
const Brand = require("../../models/brandModel");
const Product = require("../../models/productModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),

  check("subcategories") // may be array of subcategories ids or single subcategory id
    .optional()
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (subcategories, { req }) => {
      // if subcategories is array of subcategories ids

      if (Array.isArray(subcategories)) {
        // check if subcategories ids are not duplicated
        if (new Set(subcategories).size !== subcategories.length) {
          return Promise.reject(
            new Error("some subcategories ids are duplicated")
          );
        }

        for (const subcategoryId of subcategories) {
          const subcategory = await SubCategory.findById(subcategoryId);
          // check if subcategory id is exist
          if (!subcategory) {
            return Promise.reject(
              new Error(`No subcategory for this id: ${subcategoryId}`)
            );
          }

          // check if subcategories ids are belong to the category
          if (subcategory.category.toString() !== req.body.category) {
            return Promise.reject(
              new Error(
                `Subcategory with id: ${subcategoryId} does not belong to category with id: ${req.body.category}`
              )
            );
          }
        }
      } else {
        // if subcategories is single subcategory id

        return SubCategory.findById(subcategories).then((subcategory) => {
          if (!subcategory) {
            return Promise.reject(
              new Error(`No subcategory for this id: ${subcategories}`)
            );
          }
          if (subcategory.category.toString() !== req.body.category) {
            return Promise.reject(
              new Error(
                `Subcategory with id: ${subcategories} does not belong to category with id: ${req.body.category}`
              )
            );
          }
        });
      }
      return true;
    }),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((brandId) =>
      Brand.findById(brandId).then((brand) => {
        if (!brand) {
          return Promise.reject(new Error(`No brand for this id: ${brandId}`));
        }
      })
    ),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((id) =>
      Product.findById(id).then((product) => {
        if (!product) {
          return Promise.reject(new Error(`No product for this id: ${id}`));
        }

        return true;
      })
    ),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price) {
        if (req.body.price <= value) {
          throw new Error("priceAfterDiscount must be lower than price");
        }
      } else {
        return Product.findById(req.params.id).then((product) => {
          if (product.price <= value) {
            throw new Error("priceAfterDiscount must be lower than price");
          }
        });
      }

      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").optional(),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (categoryId, { req }) => {
      try {
        // check if product has subcategories

        const product = await Product.findById(req.params.id);
        if (product.subcategories.length > 0) {
          throw new Error(
            "You can't change category for product that has subcategories, please remove subcategories first"
          );
        }

        const category = await Category.findById(categoryId);
        if (!category) {
          throw new Error(`No category for this id: ${categoryId}`);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }),

  check("subcategories") // may be array of subcategories ids or single subcategory id
    .optional()
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom(async (subcategories, { req }) => {
      if (!req.body.category) {
        const product = await Product.findById(req.params.id);

        req.body.category = product.category._id.toString();
      }

      // if subcategories is array of subcategories ids
      if (Array.isArray(subcategories)) {
        // check if subcategories ids are not duplicated
        if (new Set(subcategories).size !== subcategories.length) {
          return Promise.reject(
            new Error("some subcategories ids are duplicated")
          );
        }

        for (const subcategoryId of subcategories) {
          const subcategory = await SubCategory.findById(subcategoryId);
          // check if subcategory id is exist
          if (!subcategory) {
            return Promise.reject(
              new Error(`No subcategory for this id: ${subcategoryId}`)
            );
          }

          // check if subcategories ids are belong to the category
          if (subcategory.category.toString() !== req.body.category) {
            return Promise.reject(
              new Error(
                `Subcategory with id: ${subcategoryId} does not belong to category with id: ${req.body.category}`
              )
            );
          }
        }
      } else {
        // if subcategories is single subcategory id

        return SubCategory.findById(subcategories).then((subcategory) => {
          if (!subcategory) {
            return Promise.reject(
              new Error(`No subcategory for this id: ${subcategories}`)
            );
          }
          if (subcategory.category.toString() !== req.body.category) {
            return Promise.reject(
              new Error(
                `Subcategory with id: ${subcategories} does not belong to category with id: ${req.body.category}`
              )
            );
          }
        });
      }
      return true;
    }),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((brandId) =>
      Brand.findById(brandId).then((brand) => {
        if (!brand) {
          return Promise.reject(new Error(`No brand for this id: ${brandId}`));
        }
      })
    ),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
