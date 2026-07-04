const express=require('express');
const { loginControllers, forgetpass } = require('../../controllers/authControllers/LoginControllers');
const router=express.Router()

router.post("/login",loginControllers)
router.post("/forget-pass", forgetpass)

module.exports=router;