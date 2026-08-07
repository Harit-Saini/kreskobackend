const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsRoutes = require("./routes/newsRoutes");
const adminSettingsRoutes = require("./routes/adminSettingsRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const faqRoutes = require("./routes/faqRoutes");

dotenv.config();

const app = express();


// ===========================
// MIDDLEWARE
// ===========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===========================
// STATIC FILES (IMPORTANT)
// ===========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ===========================
// DATABASE
// ===========================
connectDB();


// ===========================
// ROUTES
// ===========================
app.use("/api/quote", require("./routes/quoteRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/inquiry", require("./routes/inquiryRoutes"));
app.use("/api/distributor", require("./routes/distributorRoutes"));
app.use("/api/oem", require("./routes/oemRoutes"));
app.use("/api/career", require("./routes/careerRoutes"));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/faqs", faqRoutes);


// ===========================
// ROOT
// ===========================
app.get("/", (req, res) => {
  res.send("Kresko Backend Running");
});


// ===========================
// ERROR HANDLER (BONUS)
// ===========================
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server Error",
  });
});


// ===========================
// SERVER
// ===========================
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});