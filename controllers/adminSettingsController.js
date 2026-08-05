const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");


// ===============================
// CHANGE PASSWORD
// ===============================

exports.changePassword = async (req, res) => {

try {

const {
currentPassword,
newPassword,
confirmPassword
} = req.body;


// confirm password check

if(newPassword !== confirmPassword){

return res.status(400).json({
message:"New password and confirm password not match"
});

}


// minimum length

if(newPassword.length < 6){

return res.status(400).json({
message:"Password must be minimum 6 characters"
});

}



const admin = await Admin.findOne();


if(!admin){

return res.status(404).json({
message:"Admin not found"
});

}



// check current password

const isMatch = await bcrypt.compare(
currentPassword,
admin.password
);


if(!isMatch){

return res.status(400).json({
message:"Current password incorrect"
});

}



// hash new password

const hashedPassword = await bcrypt.hash(
newPassword,
10
);


admin.password = hashedPassword;


await admin.save();



res.json({

message:"Password updated successfully"

});


}
catch(error){

res.status(500).json({
message:error.message
});

}

};




// =================================
// UPDATE RECOVERY SETTINGS
// =================================

exports.updateRecoverySettings = async(req,res)=>{

try{


const {
securityQuestion,
securityAnswer
}=req.body;



const admin = await Admin.findOne();


if(!admin){

return res.status(404).json({
message:"Admin not found"
});

}



admin.securityQuestion = securityQuestion;


// hash answer

admin.securityAnswer = await bcrypt.hash(
securityAnswer.toLowerCase(),
10
);



await admin.save();



res.json({

message:"Recovery settings updated successfully"

});


}
catch(error){

res.status(500).json({
message:error.message
});

}


};