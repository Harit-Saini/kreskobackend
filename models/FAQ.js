const mongoose = require("mongoose");


const faqSchema = new mongoose.Schema({

question:{
    type:String,
    required:true
},

answer:{
    type:String,
    required:true
},

category:{
    type:String,
    required:true
},

keywords:{
    type:[String],
    default:[]
},

status:{
    type:String,
    default:"Active"
}

},
{
timestamps:true
});


module.exports = mongoose.model("FAQ",faqSchema);