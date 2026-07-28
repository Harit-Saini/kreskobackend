const express = require("express");
const router = express.Router();


const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");


const authMiddleware = require("../middleware/authMiddleware");



// Admin Add Category
router.post(
    "/add",
    authMiddleware,
    createCategory
);



// User Get Categories
router.get(
    "/",
    getCategories
);



// Admin Update Category
router.put(
    "/:id",
    authMiddleware,
    updateCategory
);



// Admin Delete Category
router.delete(
    "/:id",
    authMiddleware,
    deleteCategory
);



module.exports = router;