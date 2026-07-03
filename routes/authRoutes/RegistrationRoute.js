const express=require('express');
const router= express.Router();
const {registrationController,verifyOtp}=require("../../controllers/authControllers/RegistrationControllers");

router.post("/registration",registrationController);
router.post("/verify-otp",verifyOtp);

module.exports=router;