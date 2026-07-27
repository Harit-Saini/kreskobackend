const Inquiry = require("../models/Inquiry");



// Create Inquiry

exports.createInquiry = async(req,res)=>{


try{


const inquiry = await Inquiry.create(req.body);


res.status(201).json({

message:"Inquiry submitted successfully",

data:inquiry

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};




// Get All Inquiry (Admin)

exports.getInquiry = async(req,res)=>{


try{


const data = await Inquiry.find()
.sort({createdAt:-1});


res.json(data);


}
catch(error){


res.status(500).json({

message:error.message

});


}


};




// Delete Inquiry


exports.deleteInquiry = async(req,res)=>{


try{


await Inquiry.findByIdAndDelete(req.params.id);


res.json({

message:"Inquiry deleted"

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};