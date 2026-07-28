const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const { categoryName, uniqueKey, categoryImage } = req.body;

        if (!categoryName || !uniqueKey || !categoryImage) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existing = await Category.findOne({ uniqueKey });
        if (existing) {
            return res.status(400).json({ message: "Unique key already exists" });
        }

        const category = new Category({
            categoryName,
            uniqueKey,
            categoryImage
        });

        await category.save();

        res.status(201).json({
            message: "Category created successfully",
            category
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};