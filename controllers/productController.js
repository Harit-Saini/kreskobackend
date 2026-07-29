const Product=require("../models/Product");


// Admin Upload Product
exports.uploadProduct=async(req,res)=>{

try{

const product=new Product({

...req.body,

   image: req.file ? req.file.filename : req.body.image

});


await product.save();


res.status(201).json({
message:"Product Uploaded",
product
});


}
catch(error){

res.status(500).json({
message:error.message
});

}

};



// Public Products

exports.getProducts=async(req,res)=>{

try{

const products=await Product.find();

res.json(products);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};