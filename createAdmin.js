const mongoose=require("mongoose");
const dotenv=require("dotenv");
const bcrypt=require("bcrypt");

const Admin=require("./models/Admin");


dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(async()=>{


const passwordHash = await bcrypt.hash(
"admin123",
10
);


const answerHash = await bcrypt.hash(
"kresko",
10
);



await Admin.create({

name:"Kresko Admin",

password:passwordHash,

securityQuestion:
"What is Kresko primary location?",

securityAnswer:answerHash

});


console.log("Admin Created ✅");


mongoose.connection.close();


})
.catch(err=>{

console.log(err);

});