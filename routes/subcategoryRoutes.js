const express = require("express");
const router = express.Router();

const {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategory
} = require("../controllers/subcategoryController");

const authMiddleware = require("../middleware/authMiddleware");

// Admin Add
router.post("/add", authMiddleware, createSubcategory);

// All
router.get("/", getSubcategories);

// 🔥 By Category Unique Key
router.get("/category/:categoryKey", getSubcategoriesByCategory);

// Update
router.put("/:id", authMiddleware, updateSubcategory);

// Delete
router.delete("/:id", authMiddleware, deleteSubcategory);

module.exports = router;