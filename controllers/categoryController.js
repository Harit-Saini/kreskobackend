const Category = require("../models/Category");


// CREATE CATEGORY (Admin)
exports.createCategory = async (req, res) => {

    try {

        const {
            categoryName,
            uniqueKey,
            categoryImage
        } = req.body;


        if (!categoryName || !uniqueKey || !categoryImage) {
            return res.status(400).json({
                message: "All fields required"
            });
        }


        const existing = await Category.findOne({
            uniqueKey
        });


        if (existing) {
            return res.status(400).json({
                message: "Unique key already exists"
            });
        }


        const category = new Category({
            categoryName,
            uniqueKey,
            categoryImage
        });


        await category.save();


        res.status(201).json({
            message: "Category created successfully",
            category
        });


    } catch(error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

};




// GET ALL CATEGORY (User)
exports.getCategories = async (req,res)=>{

    try {

        const categories = await Category.find();


        res.status(200).json({
            categories
        });


    } catch(error){

        res.status(500).json({
            message:"Server error",
            error:error.message
        });

    }

};





// UPDATE CATEGORY (Admin)
exports.updateCategory = async(req,res)=>{

    try {


        const {
            categoryName,
            uniqueKey,
            categoryImage
        } = req.body;



        const category = await Category.findByIdAndUpdate(

            req.params.id,

            {
                categoryName,
                uniqueKey,
                categoryImage
            },

          {
           returnDocument:"after"
              } 
        );



        if(!category){

            return res.status(404).json({
                message:"Category not found"
            });

        }



        res.status(200).json({

            message:"Category updated successfully",

            category

        });



    } catch(error){


        res.status(500).json({

            message:"Server error",

            error:error.message

        });


    }

};







// DELETE CATEGORY (Admin)
exports.deleteCategory = async(req,res)=>{

    try {


        const category = await Category.findByIdAndDelete(
            req.params.id
        );



        if(!category){

            return res.status(404).json({

                message:"Category not found"

            });

        }



        res.status(200).json({

            message:"Category deleted successfully"

        });



    } catch(error){


        res.status(500).json({

            message:"Server error",

            error:error.message

        });


    }

};