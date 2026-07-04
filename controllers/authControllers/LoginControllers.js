const { loginfieldValidate, generateAccesssToken } = require("../../helpers/loginUtils");
const user=require("../../models/userSchema");


const loginControllers=async(req,res)=>{
   try{

       const {email ,password}=req.body; 
       const msg=loginfieldValidate(email,password);
       if(Object.keys(msg).length!=0) return res.status(400).send({msg});
       
       const isUser=await user.findOne({
           email
        })
        if(!isUser) return res.status(400).send({message:"Invalid Credentials"});
       const match=await isUser.comparePassword(password);
       if(!match) return res.status(400).send({message:"Invalid Credentials"});
       const accessToken=generateAccesssToken({email,id:isUser._id});
       console.log(accessToken);
       return res.status(200).send({messgae:"Login Successfully"})
    }catch(error){
       res.status(500).send({message:error.messge}); 
    } 

}



module.exports={loginControllers}