const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ==========================
// LOGIN
// ==========================
exports.loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==========================
// SECURITY QUESTION
// ==========================
exports.getSecurityQuestion = async (req, res) => {
  try {
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      question: admin.securityQuestion
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==========================
// RESET PASSWORD (FORGOT)
// ==========================
exports.changePassword = async (req, res) => {
  try {
    const { answer, newPassword, confirmPassword } = req.body;

    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // ✅ normalize answer
    const formattedAnswer = answer.trim().toLowerCase();

    const isMatch = await bcrypt.compare(
      formattedAnswer,
      admin.securityAnswer
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong Security Answer"
      });
    }

    // ✅ password match check
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    // ✅ password length check
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // ✅ hash new password
    const newHash = await bcrypt.hash(newPassword, 10);

    admin.password = newHash;
    await admin.save();

    res.json({
      message: "Password Changed Successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};