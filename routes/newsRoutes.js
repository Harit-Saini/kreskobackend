const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  getNewsBySlug,
  updateNews,
  deleteNews
} = require("../controllers/newsController");

const authMiddleware = require("../middleware/authMiddleware");


// =====================
// Admin Only Routes
// =====================

router.post("/create", authMiddleware, createNews);

router.put("/:id", authMiddleware, updateNews);

router.delete("/:id", authMiddleware, deleteNews);


// =====================
// Public Routes (User)
// =====================

router.get("/", getNews);

router.get("/:slug", getNewsBySlug);


module.exports = router;