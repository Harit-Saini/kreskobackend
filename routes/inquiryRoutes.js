const express = require("express");

const router = express.Router();


const {

createInquiry,
getInquiry,
deleteInquiry

}=require("../controllers/inquiryController");


const auth=require("../middleware/authMiddleware");



// Public Form Submit

router.post(
"/send",
createInquiry
);



// Admin View

router.get(
"/all",
auth,
getInquiry
);



// Admin Delete

router.delete(
"/:id",
auth,
deleteInquiry
);



module.exports=router;