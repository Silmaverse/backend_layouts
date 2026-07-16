const express=require('express');
const router= express.Router();
const registrationController=require("../../controllers/authControllers/RegistrationControllers");
const middleware=require("../../middlewares/authMiddleware");

router.post("/registration",registrationController.registrationController);
router.post("/verify-otp",registrationController.verifyOtp);
router.post("/resendOtp",registrationController.resendOTP);
router.post("/register/staff", registrationController.registerStaff);



module.exports=router;