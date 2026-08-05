const express = require("express");

const router = express.Router();


const {
createBlog,
getBlogs,
getSingleBlog,
deleteBlog

}=require("../controllers/blogController");


const upload = require("../middleware/blogMiddleware");

const authMiddleware = require("../middleware/authMiddleware");



// Admin create blog

router.post(
"/create",
authMiddleware,
upload.single("image"),
createBlog
);



// Public blogs

router.get(
"/",
getBlogs
);



// Single blog

router.get(
"/:id",
getSingleBlog
);



// Admin delete

router.delete(
"/:id",
authMiddleware,
deleteBlog
);



module.exports = router;