const Career = require("../models/Career");



// Career Apply


exports.createCareer = async(req,res)=>{


try{


const data = await Career.create({

...req.body,

resume:req.file ? req.file.filename : ""

});



res.status(201).json({

message:"Application submitted",

data

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};




// Get Careers


exports.getCareers = async(req,res)=>{


try{


const data = await Career.find()
.sort({createdAt:-1});


res.json(data);


}
catch(error){

res.status(500).json({

message:error.message

});

}


};




// Delete Career


exports.deleteCareer = async(req,res)=>{


try{


await Career.findByIdAndDelete(req.params.id);


res.json({

message:"Deleted"

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};