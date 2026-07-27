const mongoose=require("mongoose");


const quoteSchema=new mongoose.Schema({

fullname:{
type:String,
required:true
},

businessEmail:{
type:String,
required:true
},

phone:String,

companyName:String,

productInterest:String,

specifications:String,

message:String,


status:{
type:String,
default:"Pending"
}


},{timestamps:true});


module.exports=mongoose.model("Quote",quoteSchema);