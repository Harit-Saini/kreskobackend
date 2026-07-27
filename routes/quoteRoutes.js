const express=require("express");

const router=express.Router();


const {
createQuote,
getQuotes,
deleteQuote

}=require("../controllers/quoteController");


const auth=require("../middleware/authMiddleware");



// Public

router.post("/send",createQuote);


// Admin

router.get("/all",auth,getQuotes);

router.delete("/:id",auth,deleteQuote);



module.exports=router;