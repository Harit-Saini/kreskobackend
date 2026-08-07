const Catalog = require("../models/Catalog");
const fs = require("fs");


// ===========================
// ADD / UPDATE CATALOG
// ===========================
exports.saveCatalog = async (req, res) => {
  try {
    let catalog = await Catalog.findOne();

    let pdfFile = "";
    let fileName = "";
    let fileSize = "";

    if (req.file) {
      pdfFile = "/uploads/catalogs/" + req.file.filename;
      fileName = req.file.originalname;

      // Convert bytes to MB
      fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + " MB";
    }

    if (!catalog) {
      catalog = new Catalog({
        file: pdfFile,
        pdfLink: req.body.pdfLink || "",
        fileName,
        fileSize,
      });
    } else {

      // 🔥 OLD FILE DELETE (IMPORTANT)
      if (req.file && catalog.file) {
        const oldPath = "." + catalog.file;

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      catalog.file = pdfFile || catalog.file;
      catalog.pdfLink = req.body.pdfLink || catalog.pdfLink;
      catalog.fileName = fileName || catalog.fileName;
      catalog.fileSize = fileSize || catalog.fileSize;
    }

    await catalog.save();

    res.status(200).json({
      message: "Catalog saved successfully",
      catalog,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ===========================
// GET PUBLIC CATALOG
// ===========================
exports.getCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findOne();

    if (!catalog) {
      return res.status(404).json({
        message: "Catalog not found",
      });
    }

    res.json(catalog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ===========================
// DELETE CATALOG BY ID
// ===========================
exports.deleteCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);

    if (!catalog) {
      return res.status(404).json({
        message: "Catalog not found",
      });
    }

    // Delete file
    if (catalog.file) {
      const filePath = "." + catalog.file;

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Catalog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Catalog deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};