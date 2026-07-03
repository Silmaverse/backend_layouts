const crypto=require('crypto');

const fieldValidate=function fieldValidate(name,email,password){
    const errormsg={}
    if(!name){
       errormsg.nameerror="Please enter your name";
    }
    if(!email){
       errormsg.emailerror="Please enter your email";
    }
    if(!password){
       errormsg.password="Please enter your password";
    }
    return errormsg;
}
const validation=function fieldValidation(email,password){
   const errormsg={}
   const emailpattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const passpattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   if(!emailpattern.test(email)) errormsg.email="Invalid Email"
   if(!passpattern.test(password)) errormsg.password="Invalid Password"

   return errormsg
}

const otpVerifyValidate=function otpVerify(email,otp){
   const errormsg={}
   if(!email) errormsg.emailError="Please enter your Email";
   if(!otp) errormsg.otpError="Please enter your Otp";
   
   return errormsg;
} 

const generateOtp=function generateOtp(){
    return crypto.randomInt(100000, 999999).toString();
}


module.exports={fieldValidate , validation ,generateOtp , otpVerifyValidate}