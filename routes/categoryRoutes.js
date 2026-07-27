const express = require("express");

const router = express.Router();


const {
createCategory,
getCategories,
deleteCategory

}=require("../controllers/categoryController");


const authMiddleware = require("../middleware/authMiddleware");



// Admin create category

router.post(
"/add",
authMiddleware,
createCategory
);



// User get categories

router.get(
"/",
getCategories
);



// Admin delete

router.delete(
"/:id",
authMiddleware,
deleteCategory
);



module.exports = router;