const express=require('express');
const { loginControllers } = require('../../controllers/authControllers/LoginControllers');
const router=express.Router()

router.post("/login",loginControllers)

module.exports=router;