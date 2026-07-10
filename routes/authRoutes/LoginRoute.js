const express=require('express');
const loginControllers = require('../../controllers/authControllers/LoginControllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const router=express.Router()

router.post("/login",loginControllers.loginControllers);
router.post("/forget-pass", loginControllers.forgetpass);
router.post("/resetPassword/:token", loginControllers.resetPassword);
router.post("/logout",loginControllers.logout);
router.get("/profile", authMiddleware  ,loginControllers.getProfile);
router.get("/userList", authMiddleware  ,loginControllers.allUsers);

module.exports=router;