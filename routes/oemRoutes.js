const express=require("express");

const router=express.Router();


const {

createOEM,
getOEM,
deleteOEM

}=require("../controllers/oemController");


const auth=require("../middleware/authMiddleware");



router.post("/request",createOEM);


router.get("/all",auth,getOEM);


router.delete("/:id",auth,deleteOEM);



module.exports=router;