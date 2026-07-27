const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

name:{
 type:String,
 required:true
},

category:String,

variant:String,

price:Number,

unit:String,

moq:Number,

moqUnit:String,

dilution:String,

dilutedPrice:String,

description:String,

badge:String,

specifications:Object,

image:String

},
{
timestamps:true
});


module.exports = mongoose.model("Product",productSchema);