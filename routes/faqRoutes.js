const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");


const {

createFAQ,
getFAQs,
getAdminFAQs,
updateFAQ,
deleteFAQ

}=require("../controllers/faqController");




// ADMIN CREATE

router.post(
"/create",
authMiddleware,
createFAQ
);



// PUBLIC FAQ

router.get(
"/",
getFAQs
);



// ADMIN FAQ LIST

router.get(
"/admin",
authMiddleware,
getAdminFAQs
);



// ADMIN UPDATE

router.put(
"/:id",
authMiddleware,
updateFAQ
);



// ADMIN DELETE

router.delete(
"/:id",
authMiddleware,
deleteFAQ
);



module.exports = router;