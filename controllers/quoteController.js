const Quote = require("../models/Quote");


// POST Quote Request

exports.createQuote = async(req,res)=>{

try{

const quote = await Quote.create(req.body);


res.status(201).json({

message:"Quote request submitted",
data:quote

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};



// GET All Quotes

exports.getQuotes = async(req,res)=>{

try{


const quotes = await Quote.find()
.sort({createdAt:-1});


res.json(quotes);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};




// DELETE Quote


exports.deleteQuote = async(req,res)=>{

try{


await Quote.findByIdAndDelete(req.params.id);


res.json({

message:"Quote deleted"

});


}
catch(error){

res.status(500).json({
message:error.message
});

}


};