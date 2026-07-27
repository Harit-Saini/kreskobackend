const express=require("express");

const router=express.Router();


const {

createDistributor,
getDistributors,
deleteDistributor

}=require("../controllers/distributorController");


const auth=require("../middleware/authMiddleware");



router.post("/apply",createDistributor);


router.get("/all",auth,getDistributors);


router.delete("/:id",auth,deleteDistributor);



module.exports=router;