const OEM = require("../models/OEM");



// Create OEM Request


exports.createOEM = async(req,res)=>{


try{


const data = await OEM.create(req.body);


res.status(201).json({

message:"OEM request submitted",

data

});


}
catch(error){

res.status(500).json({

message:error.message

});


}

};





// Get OEM Requests


exports.getOEM = async(req,res)=>{


try{


const data = await OEM.find()
.sort({createdAt:-1});


res.json(data);


}
catch(error){

res.status(500).json({

message:error.message

});

}


};




// Delete OEM


exports.deleteOEM = async(req,res)=>{


try{


await OEM.findByIdAndDelete(req.params.id);


res.json({

message:"OEM deleted"

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};