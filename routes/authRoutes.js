const express=require("express");

const router=express.Router();


const {

loginAdmin,
getSecurityQuestion,
changePassword

}=require("../controllers/authController");



router.post(
"/login",
loginAdmin
);


router.get(
"/security-question",
getSecurityQuestion
);



router.post(
"/change-password",
changePassword
);



module.exports=router;