const News = require("../models/News");


// =====================
// Create News (Admin)
// =====================

exports.createNews = async (req, res) => {
  try {

    const news = new News(req.body);

    await news.save();

    res.status(201).json({
      message: "News created",
      news
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};



// =====================
// Get All News (Public)
// =====================

exports.getNews = async (req, res) => {

  try {

    const { search, category } = req.query;

    let filter = {};


    if(search){
      filter.title = {
        $regex: search,
        $options:"i"
      };
    }


    if(category){
      filter.category = category;
    }


    const news = await News
    .find(filter)
    .sort({createdAt:-1});


    res.json(news);


  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};



// =====================
// Get Single News (Public)
// =====================

exports.getNewsBySlug = async(req,res)=>{

  try{

    const news = await News.findOne({
      slug:req.params.slug
    });


    if(!news){

      return res.status(404).json({
        message:"News not found"
      });

    }


    res.json(news);


  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};




// =====================
// Update News (Admin)
// =====================

exports.updateNews = async(req,res)=>{

  try{


    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
      returnDocument:"after"
        }
    );


    if(!news){

      return res.status(404).json({
        message:"News not found"
      });

    }


    res.json({

      message:"News updated",
      news

    });



  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};




// =====================
// Delete News (Admin)
// =====================

exports.deleteNews = async(req,res)=>{

  try{


    const news = await News.findByIdAndDelete(
      req.params.id
    );


    if(!news){

      return res.status(404).json({
        message:"News not found"
      });

    }


    res.json({

      message:"News deleted"

    });


  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};