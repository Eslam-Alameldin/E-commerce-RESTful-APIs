const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");

exports.createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);

  res.status(201).json({
    data: product,
  });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return new ApiError(`No product with id: ${id} is found`, 404);
  }

  res.status(200).json({
    data: product,
  });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).limit(limit).skip(skip);

  res.status(200).json({ results: products.length, page, data: products });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No product for this id: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product for this id: ${id}`, 404));
  }
  res.status(204).send();
});
