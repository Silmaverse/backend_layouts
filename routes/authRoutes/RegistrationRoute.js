const express=require('express');
const router= express.Router();
const {registrationController,verifyOtp, resendOTP}=require("../../controllers/authControllers/RegistrationControllers");

router.post("/registration",registrationController);
router.post("/verify-otp",verifyOtp);
router.post("/resendOtp",resendOTP);

module.exports=router;