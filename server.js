const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const productRoutes=require("./routes/productRoutes");

const categoryRoutes=require("./routes/categoryRoutes");

const subcategoryRoutes = require("./routes/subcategoryRoutes");

const blogRoutes = require("./routes/blogRoutes");

const newsRoutes = require("./routes/newsRoutes");

const adminSettingsRoutes = require("./routes/adminSettingsRoutes");

const catalogRoutes = require("./routes/catalogRoutes");

const faqRoutes = require("./routes/faqRoutes");

dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());

app.use("/uploads",express.static("uploads"));


// database
connectDB();



// routes

app.use("/api/quote",
require("./routes/quoteRoutes")
);

app.use("/api/auth",
require("./routes/authRoutes")
);

app.use("/api/inquiry",
require("./routes/inquiryRoutes")
);



app.use("/api/distributor",
require("./routes/distributorRoutes")
);


app.use("/api/oem",
require("./routes/oemRoutes")
);


app.use("/api/career",
require("./routes/careerRoutes")
);

app.use(
"/api/products",
productRoutes
);

app.use(
"/api/categories",
categoryRoutes
);


app.use("/api/subcategories", subcategoryRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/news", newsRoutes);

app.use(
"/api/admin/settings",
adminSettingsRoutes
);

app.use(
"/api/catalog",
catalogRoutes
);

app.use(
"/api/faqs",
faqRoutes
);

app.get("/",(req,res)=>{

    res.send("Kresko Backend Running");

});



const PORT = process.env.PORT || 5005;


app.listen(PORT,()=>{

console.log(`Server running ${PORT}`);

});