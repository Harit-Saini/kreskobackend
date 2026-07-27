const Distributor = require("../models/Distributor");



// Apply Distributor

exports.createDistributor = async(req,res)=>{


try{


const data = await Distributor.create(req.body);



res.status(201).json({

message:"Distributor application submitted",

data

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};




// Get All Distributor


exports.getDistributors = async(req,res)=>{


try{


const data = await Distributor.find()
.sort({createdAt:-1});


res.json(data);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};




// Delete


exports.deleteDistributor = async(req,res)=>{


try{


await Distributor.findByIdAndDelete(req.params.id);


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