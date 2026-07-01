const express=require('express');
const router=express.Router();
const baseurl=process.env.BASE_URL;
const authRoute=require("./authRoute/index");

router.use(baseurl,authRoute)

module.exports=router


