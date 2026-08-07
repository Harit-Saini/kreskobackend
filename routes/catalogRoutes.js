const express = require("express");
const router = express.Router();

const {
  saveCatalog,
  getCatalog,
  deleteCatalog
} = require("../controllers/catalogController");

const upload = require("../middleware/catalogUploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");


// ===========================
// ADMIN: ADD / UPDATE CATALOG
// ===========================
router.post(
  "/save",
  authMiddleware,
  upload.single("file"),   // ✅ IMPORTANT: field name = "file"
  saveCatalog
);


// ===========================
// PUBLIC: GET CATALOG
// ===========================
router.get(
  "/",
  getCatalog
);


// ===========================
// ADMIN: DELETE CATALOG BY ID
// ===========================
router.delete(
  "/delete/:id",
  authMiddleware,
  deleteCatalog
);


module.exports = router;