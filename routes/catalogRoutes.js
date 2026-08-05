const express = require("express");

const router = express.Router();


const {
saveCatalog,
getCatalog,
deleteCatalog

}=require("../controllers/catalogController");


const upload = require("../middleware/catalogUploadMiddleware");


const authMiddleware = require("../middleware/authMiddleware");



// Admin Upload PDF

router.post(
"/save",
authMiddleware,
upload.single("pdf"),
saveCatalog
);



// Public Download Link

router.get(
"/",
getCatalog
);

router.delete(
"/delete/:id",
authMiddleware,
deleteCatalog
);

module.exports = router;