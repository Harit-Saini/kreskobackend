const FAQ = require("../models/FAQ");



// ==========================
// CREATE FAQ (ADMIN)
// ==========================

exports.createFAQ = async(req,res)=>{

try{


const faq = await FAQ.create({

question:req.body.question,

answer:req.body.answer,

category:req.body.category,

keywords:req.body.keywords

});


res.status(201).json({

message:"FAQ Created Successfully",

faq

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};





// ==========================
// GET ALL FAQ (PUBLIC)
// ==========================

exports.getFAQs = async(req,res)=>{

try{


const faqs = await FAQ.find()
.sort({
createdAt:-1
});


res.json(faqs);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// ==========================
// GET FAQ FOR ADMIN
// ==========================

exports.getAdminFAQs = async(req,res)=>{

try{


const faqs = await FAQ.find()
.sort({
createdAt:-1
});


res.json(faqs);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};







// ==========================
// UPDATE FAQ (ADMIN)
// ==========================

exports.updateFAQ = async(req,res)=>{

try{


const faq = await FAQ.findByIdAndUpdate(

req.params.id,

{

question:req.body.question,

answer:req.body.answer,

category:req.body.category,

keywords:req.body.keywords,

status:req.body.status

},

{
returnDocument:"after"
}

);


res.json({

message:"FAQ Updated Successfully",

faq

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};







// ==========================
// DELETE FAQ (ADMIN)
// ==========================

exports.deleteFAQ = async(req,res)=>{

try{


await FAQ.findByIdAndDelete(req.params.id);


res.json({

message:"FAQ Deleted Successfully"

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};