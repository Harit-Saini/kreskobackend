const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
} = require("../controllers/blogController");

const upload = require("../middleware/blogMiddleware");

// ✅ FIXED
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  createBlog
);

router.get("/", getBlogs);
router.get("/:id", getSingleBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;