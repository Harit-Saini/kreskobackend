const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin only
router.post("/add", authMiddleware, createCategory);

module.exports = router;