const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// ==========================
// ADMIN LOGIN
// ==========================

exports.loginAdmin = async (req, res) => {

    try {

        const { password } = req.body;


        // ek hi admin hai isliye first admin find
        const admin = await Admin.findOne();


        if (!admin) {

            return res.status(404).json({
                message: "Admin not found"
            });

        }



        // password compare
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );



        if (!isMatch) {

            return res.status(401).json({
                message: "Wrong Password"
            });

        }



        // JWT Token Generate

        const token = jwt.sign(

            {
                id: admin._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );



        res.status(200).json({

            message: "Login Successful",

            token

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};





// ==========================
// GET SECURITY QUESTION
// ==========================

exports.getSecurityQuestion = async (req, res) => {

    try {


        const admin = await Admin.findOne();


        if (!admin) {

            return res.status(404).json({

                message: "Admin not found"

            });

        }



        res.json({

            question: admin.securityQuestion

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};







// ==========================
// CHANGE PASSWORD
// ==========================

exports.changePassword = async (req, res) => {

    try {


        const {
            answer,
            newPassword
        } = req.body;



        const admin = await Admin.findOne();



        if (!admin) {

            return res.status(404).json({

                message:"Admin not found"

            });

        }




        // Security answer verify

     // ✅ NEW (yahi lagana hai)
const answerMatch = await bcrypt.compare(
    answer.trim().toLowerCase(),
    admin.securityAnswer
);



        if (!answerMatch) {


            return res.status(401).json({

                message:"Wrong Security Answer"

            });


        }




        // New password hash

        const newHashPassword = await bcrypt.hash(

            newPassword,

            10

        );



        admin.password = newHashPassword;



        await admin.save();




        res.json({

            message:"Password Changed Successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};