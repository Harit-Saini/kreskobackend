const mongoose=require("mongoose");


const adminSchema=new mongoose.Schema({

name:{
type:String,
required:true
},


password:{
type:String,
required:true
},


securityQuestion:{
type:String,
required:true
},


securityAnswer:{
type:String,
required:true
}


},{timestamps:true});


module.exports=mongoose.model("Admin",adminSchema);