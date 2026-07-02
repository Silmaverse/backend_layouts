const express=require('express');
const router=express.Router();
const loginRoute=require('./LoginRoute')
const authRouteegistrationRoute=require("./RegistrationRoute");
const registrationRoute = require('./RegistrationRoute');

router.use("/auth",loginRoute);
router.use("/auth",registrationRoute);



module.exports=router