const mongoose=require("mongoose");


const careerSchema=new mongoose.Schema({


fullname:String,

email:String,

phone:String,


position:String,


experience:String,


resume:String,


coverLetter:String,


status:{
type:String,
default:"Pending"
}



},{timestamps:true});



module.exports=mongoose.model(
"Career",
careerSchema
);