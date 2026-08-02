const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// ✅ Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { subcategoryName, uniqueKey, categoryUniqueKey } = req.body;

    // check category exists
    const category = await Category.findOne({ uniqueKey: categoryUniqueKey });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // check unique key
    const exists = await Subcategory.findOne({ uniqueKey });
    if (exists) {
      return res.status(400).json({
        message: "Subcategory unique key already exists",
      });
    }

    const subcategory = new Subcategory({
      subcategoryName,
      uniqueKey,
      categoryUniqueKey,
    });

    await subcategory.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 🔥 Get Subcategories by Category Unique Key
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryKey } = req.params;

    const subcategories = await Subcategory.find({
      categoryUniqueKey: categoryKey,
    });

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Subcategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Subcategory updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Subcategory.findByIdAndDelete(id);

    res.json({
      message: "Subcategory deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};