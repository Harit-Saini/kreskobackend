const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },

    uniqueKey: {
        type: String,
        required: true,
        unique: true
    },

    categoryImage: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});


module.exports = mongoose.model("Category", categorySchema);