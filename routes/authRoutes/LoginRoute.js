const express=require('express');
const loginControllers = require('../../controllers/authControllers/LoginControllers');
const router=express.Router()

router.post("/login",loginControllers.loginControllers);
router.post("/forget-pass", loginControllers.forgetpass);
router.post("/resetPassword/:id/:token", loginControllers.resetPassword);
router.post("/logout",loginControllers.logout)

module.exports=router;