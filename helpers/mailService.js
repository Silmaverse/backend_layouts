const nodemailer=require('nodemailer');
const otpmailTemp = require('../templates/otpMailTemplate');


// A transporter is an object that handles the connection to your email service and sends messages on your behal
// f. You create one transporter and reuse it for all your emails.email

const transporter=nodemailer.createTransport({
   host:"smtp.gmail.com",
   port:587,
   secure:false,
   auth:{
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS
   } 
})
//verify smtp
const veify=async function verify(){
    try{
        await transporter.verify();
        console.log("Server is ready to take our messages")
    }catch(err){
        console.log("Verification failed",err) 
    }
}
veify()

//sending mail on behalf of my mail

const info= async function sendMail(email,subject,template){
    try{
       await transporter.sendMail({
         from:`"School Management" <${process.env.SMTP_USER}>`,
         to:email,
         subject,
         html:template

       }) 
    }catch(err){
       console.log("Error while sending email",err) 
    }
}


module.exports=info