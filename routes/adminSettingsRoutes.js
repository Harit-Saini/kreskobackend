const express = require("express");

const router = express.Router();


const {
changePassword,
updateRecoverySettings

}=require("../controllers/adminSettingsController");


const authMiddleware = require("../middleware/authMiddleware");



// Change Password

router.put(
"/change-password",
authMiddleware,
changePassword
);



// Recovery Question Settings

router.put(
"/recovery-settings",
authMiddleware,
updateRecoverySettings
);



module.exports = router;