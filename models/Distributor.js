const mongoose=require("mongoose");


const distributorSchema=new mongoose.Schema({

contactPersonName:String,

businessEmail:String,

phone:String,

distributionFirmName:String,

territory:String,

infrastructure:String,


status:{
type:String,
default:"Pending"
}


},{timestamps:true});



module.exports=mongoose.model(
"Distributor",
distributorSchema
);