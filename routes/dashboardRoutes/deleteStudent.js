const express=require('express');
const router=express.Router();

const deleteStudent=router.get("/delete",(req,res)=>{
    res.send('Eikhane student delete hbe');
})


module.exports=deleteStudent