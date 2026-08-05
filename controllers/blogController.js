const Blog = require("../models/Blog");



// CREATE BLOG

exports.createBlog = async(req,res)=>{

try{


const blog = await Blog.create({

title:req.body.title,

category:req.body.category,

description:req.body.description,

content:req.body.content,

image:req.file ? req.file.filename : ""

});


res.status(201).json({

message:"Blog created successfully",

blog

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};




// GET ALL BLOGS

exports.getBlogs = async(req,res)=>{

try{


const blogs = await Blog.find()
.sort({createdAt:-1});


res.json(blogs);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};




// GET SINGLE BLOG

exports.getSingleBlog = async(req,res)=>{

try{


const blog = await Blog.findById(req.params.id);


if(!blog){

return res.status(404).json({

message:"Blog not found"

});

}


res.json(blog);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};




// DELETE BLOG

exports.deleteBlog = async(req,res)=>{

try{


await Blog.findByIdAndDelete(req.params.id);


res.json({

message:"Blog deleted successfully"

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};