const nodemailer = require("nodemailer");

// A transporter is an object that handles the connection to your email service and sends messages on your behal
// f. You create one transporter and reuse it for all your emails.email

let transporter = null;

function hasSmtpCredentials() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function useEtherealFallback() {
  return process.env.MAIL_MODE === "ethereal";
}

async function mailConfig() {
  if (transporter) {
    return transporter;
  }
  if (hasSmtpCredentials()) {
    try {
      transporter =nodemailer.createTransport({
        host:process.env.SMTP_HOST|| "smtp.gmail.com",
        port:Number(process.env.SMTP_PORT) ||587,
        secure:process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.verify();
      console.log("Server is ready to take pur message");
      return {
        transporter,
        from:`School Management ${process.env.SMTP_USER}`   
    }
    } catch (err) {
      console.error("Verifiaction failed", err);
      throw err;
    }
  }

  if (useEtherealFallback()) {
    try {
      const testaccount = await nodemailer.createTestAccount();

      console.log("\n--- Dev mail (Ethereal preview only) ---");
      console.log(
        "Set SMTP_USER + SMTP_PASS in .env to deliver to real inboxes.\n",
      );

      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: Number(process.env.SMTP_PORT)||587,
        secure: process.env.SMTP_SECURE==="true",
        auth: {
          user: testaccount.user,
          pass: testaccount.pass,
        },
      });
      return {
        transporter,
        from:`School Management ${testaccount.user}`
    };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  console.warn("\n--- Mail not configured properly. ---");
  console.warn("Add Gmail (or other SMTP) credentials to .env to send registration emails.");
  return null;
}

//sending mail on behalf of my mail

async function initMail(email,subject,template ) {
  try{
      const  {transporter ,from} =await mailConfig(); 
      if(transporter){
       return  await transporter.sendMail({
            from:from,
            to: email,
            subject,
            html: template,
          });
      }
      console.error("Mail is not configured properly"); 
      return null;
    }catch(err){
       console.log(err);
       throw err;  
    }  
    
}


module.exports = initMail;
