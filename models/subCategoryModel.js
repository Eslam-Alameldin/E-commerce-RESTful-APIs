const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subCategory required"],
      unique: [true, "SubCategory must be unique"],
      minLength: [2, "Too short subCategory name"],
      maxLength: [32, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subCategorySchema);
