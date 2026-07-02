const express=require('express');
const router=express.Router();
const baseurl=process.env.BASE_URL;
const authRoute=require("./authRoutes/index");
const dashboarRoute=require("./dashboardRoutes/index");

router.use(baseurl,authRoute);
router.use(baseurl,dashboarRoute);

module.exports=router