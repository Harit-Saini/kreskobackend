const mongoose = require("mongoose");


const newsSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },


    slug:{
        type:String,
        required:true,
        unique:true
    },


    category:{
        type:String,
        required:true
    },


    description:{
        type:String,
        required:true
    },


    content:{
        type:String,
        required:true
    },


    image:{
        type:String,
        default:""
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "News",
    newsSchema
);