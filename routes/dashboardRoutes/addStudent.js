const express=require('express');
const router=express.Router();

const addStudent=router.get("/add",(req,res)=>{
    res.send('Eikhane student add hbe');
})


module.exports=addStudent