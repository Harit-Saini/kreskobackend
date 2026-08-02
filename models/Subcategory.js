const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    subcategoryName: {
      type: String,
      required: true,
    },

    uniqueKey: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔥 Ye main connection hai
    categoryUniqueKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);