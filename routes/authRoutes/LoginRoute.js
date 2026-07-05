const express=require('express');
const { loginControllers, forgetpass, resetPassword } = require('../../controllers/authControllers/LoginControllers');
const router=express.Router()

router.post("/login",loginControllers);
router.post("/forget-pass", forgetpass);
router.post("/resetPassword/:id/:token",resetPassword)

module.exports=router;