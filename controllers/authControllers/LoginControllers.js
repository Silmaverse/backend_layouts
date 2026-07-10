const helpers = require("../../helpers/loginUtils");
const initMail = require("../../helpers/mailService");
const User = require("../../models/userSchema");
const crypto = require("crypto");
const resetPassTemplate = require("../../templates/resetPasswordLink");


//login controlllers
const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const msg = helpers.loginfieldValidate(email, password);
    if (Object.keys(msg).length != 0) return res.status(400).json( msg );

    const isUser = await User.findOne({
      email,
      isVerified:true
    }).select("+password");
    if (!isUser)
      return res.status(400).json({ message: "Invalid Credentials or verify your email" });
    const match = await isUser.comparePassword(password);
    if (!match) return res.status(400).send({ message: "Invalid Credentials" });
    const accessToken = helpers.generateAccesssToken({ email, id: isUser._id });
    const refreshToken = helpers.generateRefreshToken({ email, id: isUser._id });
    return res
      .status(200)
      .cookie("accessToken", accessToken,helpers.cookieConfig)
      .cookie("refreshToken", refreshToken,helpers.cookieConfig)
      .json({ message: "Login Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//forget-pass
const forgetpass = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Please Enter your email" });
    const {token,hashtoken} = helpers.generateresetPassToken();
    const isUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          resetToken:hashtoken,
          resetTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      },
      { returnDocument: "after" },
    );
    if (!isUser)
      return res.status(400).json({ message: "This email is not registered" });
    const resetUrl = helpers.generateresetUrl(isUser._id,token);
    await initMail(
      email,
      "Reset Password Link",
      resetPassTemplate(isUser.name, resetUrl),
    );
    return res
      .status(200)
      .json({ message: "A reset Link has been sent to your mail" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:err.message})
  }
};


//resetPassword

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hashtoken =crypto.createHash("sha256").update(token).digest("hex");
    if (!password)
      return res.status(400).json({ message: "Please Enter your Password" });
    const passvalid=helpers.passwordvalidation(password);
    if(Object.keys(passvalid).length!=0) return res.status(400).json(passvalid);
    const isUser = await User.findOne(
      {
        resetToken: hashtoken,
        resetTokenExpires: { $gt: Date.now() },
      }
    );
    if (!isUser) return res.status(400).json({ message: "Invalid Request" });
    isUser.password=password;
    isUser.resetToken=null;
    isUser.resetTokenExpires=null;
    await isUser.save();
    return res.status(200).json({message:"Password Updated Successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getProfile=async (req,res)=>{
  try{
    const user=await User.findById(req.user.id);
    if(!user) return res.status(404).json({
      success:false,
      message:"User no longer exist"
    })
    return res.status(200).json({
      success:true,
      user
    })
  }catch(err){
    console.error(err.message);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}


const allUsers=async (req,res)=>{
  try{

    const allUsers=await User.find({})
    if(!allUsers) return res.status(404).json({
      success:false,
      message:"No users found"
    })

    return res.status(200).json({success:true,allUsers})
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }

}


const logout= async (req,res)=>{
  try{

    res.clearCookie("accessToken",helpers.cookieConfig);
    res.clearCookie("refreshToken",helpers.cookieConfig);
    return res.status(200).json({ success:true,  message:"Logout Successfully"})
  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
}

module.exports = { loginControllers, forgetpass, resetPassword ,logout ,getProfile ,allUsers};
