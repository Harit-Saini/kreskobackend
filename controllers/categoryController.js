const Category = require("../models/Category");


// Create Category (Admin)

exports.createCategory = async(req,res)=>{

try{


const {
    categoryName,
    uniqueKey,
    categoryImage
}=req.body;



const existCategory = await Category.findOne({
    uniqueKey
});


if(existCategory){

return res.status(400).json({
    message:"Category key already exists"
});

}



const category = await Category.create({

    categoryName,
    uniqueKey,
    categoryImage

});



res.status(201).json({

message:"Category Created Successfully",

category

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};



// Get All Category (User)

exports.getCategories = async(req,res)=>{

try{


const categories = await Category.find();


res.status(200).json(categories);


}
catch(error){

res.status(500).json({
message:error.message
});

}

};



// Delete Category (Admin)

exports.deleteCategory = async(req,res)=>{

try{


await Category.findByIdAndDelete(req.params.id);


res.json({
message:"Category Deleted"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}

};