const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
  file: {
    type: String,
    default: "",
  },

  pdfLink: {
    type: String,
    default: "",
  },

  fileName: {
    type: String,
    default: "",
  },

  fileSize: {
    type: String,
    default: "",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Catalog", catalogSchema);