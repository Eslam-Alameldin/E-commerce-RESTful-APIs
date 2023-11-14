const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: true,
      minLength: [3, "Too short category name"],
      maxLength: [40, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
