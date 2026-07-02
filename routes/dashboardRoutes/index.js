const express=require('express');
const router=express.Router();
const addStudent=require('./addStudent');
const deleteStudent=require('./deleteStudent');

router.use("/dashboard",addStudent)
router.use("/dashboard",deleteStudent)

module.exports=router;