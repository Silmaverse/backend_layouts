const express=require('express');
const router= express.Router();
const registrationController=require("../../controllers/authControllers/RegistrationControllers");

router.post("/registration",registrationController.registrationController);
router.post("/verify-otp",registrationController.verifyOtp);
router.post("/resendOtp",registrationController.resendOTP);

module.exports=router;