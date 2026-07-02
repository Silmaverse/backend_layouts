const express=require('express')
const router=express.Router()

const loginRoute=router.get("/login",(req,res)=>{
   res.send("Hello from login Route"); 
})

module.exports=loginRoute;