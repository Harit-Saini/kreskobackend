const express=require("express");

const router=express.Router();


const multer=require("multer");


const {

createCareer,
getCareers,
deleteCareer

}=require("../controllers/careerController");


const auth=require("../middleware/authMiddleware");




// multer storage


const storage=multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/resumes");

},


filename:(req,file,cb)=>{

cb(null,
Date.now()+"-"+file.originalname
);


}

});


const upload=multer({
storage
});




// Public

router.post(
"/apply",
upload.single("resume"),
createCareer
);




// Admin

router.get(
"/all",
auth,
getCareers
);



router.delete(
"/:id",
auth,
deleteCareer
);



module.exports=router;