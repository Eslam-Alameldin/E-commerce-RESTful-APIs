const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: true,
      minLength: [3, "Too short Brand name"],
      maxLength: [40, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", brandSchema);
