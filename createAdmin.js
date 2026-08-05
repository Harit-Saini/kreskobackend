const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  await Admin.deleteMany(); // 🧹 clean DB (important)

  const passwordHash = await bcrypt.hash("admin123", 10);

  const answerHash = await bcrypt.hash("ahmedabad", 10); // ✅ FINAL ANSWER

  await Admin.create({
    name: "Kresko Admin",
    password: passwordHash,
    securityQuestion: "What is Kresko primary location?",
    securityAnswer: answerHash
  });

  console.log("✅ Admin Created");

  mongoose.connection.close();

})
.catch(err => console.log(err));