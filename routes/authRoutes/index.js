const express=require('express');
const router=express.Router();
const loginRoute=require('./LoginRoute')
const registrationRoute = require('./RegistrationRoute');

router.use("/auth",loginRoute);
router.use("/auth",registrationRoute);



module.exports=router