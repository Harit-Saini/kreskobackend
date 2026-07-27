const express=require("express");
const router=express.Router();


const {
uploadProduct,
getProducts
}=require("../controllers/productController");


const authMiddleware=require("../middleware/authMiddleware");

const upload=require("../middleware/uploadMiddleware");


// Admin Only

router.post(
"/upload",
authMiddleware,
upload.single("image"),
uploadProduct
);


// Public

router.get(
"/",
getProducts
);


module.exports=router;