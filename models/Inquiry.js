const mongoose = require("mongoose");


const inquirySchema = new mongoose.Schema({

fullName:{
    type:String,
    required:true
},


businessEmail:{
    type:String,
    required:true
},


phone:String,


companyName:String,


productInterest:{
    type:String,
    required:true
},


message:{
    type:String,
    required:true
},


status:{
    type:String,
    default:"Pending"
}


},{timestamps:true});


module.exports = mongoose.model(
"Inquiry",
inquirySchema
);