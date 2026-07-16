const User=require("../models/userSchema");


const superadmin =async()=>{
   try{
    const adminExists =await User.findOne({role:"superadmin"});
    if(adminExists) {
        console.log("Superadmin already exists in DB");
        return;
    }
    const adminemail=process.env.INITIAL_SUPERADMIN_EMAIL;
    const adminpassword=process.env.INITIAL_SUPERADMIN_PASSWORD;

    const admin=await User.create({
       name:"System Superadmin",
       email:adminemail,
       password:adminpassword,
       role:"superadmin",
       status:"approved"
    }) 
    console.log("Super admin created Successfully");
   }catch(error){
      console.error("Error sending in message",error.message);
   } 
}


module.exports=superadmin