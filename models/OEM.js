const mongoose=require("mongoose");


const oemSchema=new mongoose.Schema({


fullname:String,

businessEmail:String,

phone:String,


brandName:String,


monthlyVolume:String,


blendingSpecs:String,


status:{
type:String,
default:"Pending"
}



},{timestamps:true});



module.exports=mongoose.model(
"OEM",
oemSchema
);