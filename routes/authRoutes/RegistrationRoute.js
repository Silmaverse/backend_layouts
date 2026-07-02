const express=require('express');
const router= express.Router();
const registrationController=require("../../controllers/authControllers/RegistrationControllers");


const registrationRoute=router.post("/registration",registrationController)

module.exports=registrationRoute;