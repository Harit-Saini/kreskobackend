const Catalog = require("../models/Catalog");
const fs = require("fs");



// ===========================
// ADD / UPDATE CATALOG
// ===========================

exports.saveCatalog = async(req,res)=>{


try{


let catalog = await Catalog.findOne();


let pdfFile = "";


if(req.file)
{
    pdfFile = "/uploads/catalogs/" + req.file.filename;
}



if(!catalog)
{

    catalog = new Catalog({

        file: pdfFile,

        pdfLink: req.body.pdfLink || ""

    });


}
else
{

    catalog.file = pdfFile || catalog.file;

    catalog.pdfLink = req.body.pdfLink || catalog.pdfLink;

}



await catalog.save();



res.status(200).json({

    message:"Catalog saved successfully",

    catalog

});


}
catch(error)
{

res.status(500).json({

message:error.message

});

}


};







// ===========================
// GET PUBLIC CATALOG
// ===========================

exports.getCatalog = async(req,res)=>{


try{


const catalog = await Catalog.findOne();


if(!catalog)
{

return res.status(404).json({

message:"Catalog not found"

});

}



res.json(catalog);


}
catch(error)
{

res.status(500).json({

message:error.message

});

}


};








// ===========================
// DELETE CATALOG BY ID
// ===========================

exports.deleteCatalog = async(req,res)=>{


try{


const catalog = await Catalog.findById(req.params.id);



if(!catalog)
{

return res.status(404).json({

message:"Catalog not found"

});

}



// Delete PDF file from uploads folder

if(catalog.file)
{

const filePath = "." + catalog.file;


if(fs.existsSync(filePath))
{

fs.unlinkSync(filePath);

}

}



// Delete catalog from database

await Catalog.findByIdAndDelete(req.params.id);



res.json({

message:"Catalog deleted successfully"

});


}
catch(error)
{

res.status(500).json({

message:error.message

});

}


};