const {
  loginfieldValidate,
  generateAccesssToken,
  generateRefreshToken,
  generateresetPassToken,
  passwordvalidation,
} = require("../../helpers/loginUtils");
const info = require("../../helpers/mailService");
const { token, hashtoken } = generateresetPassToken();
const user = require("../../models/userSchema");
const crypto = require("crypto");
const resetPassTemplate = require("../../templates/resetPasswordLink");


//login controlllers
const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const msg = loginfieldValidate(email, password);
    if (Object.keys(msg).length != 0) return res.status(400).send({ msg });

    const isUser = await user.findOne({
      email,
    });
    if (!isUser)
      return res.status(400).send({ message: "Invalid Credentials" });
    const match = await isUser.comparePassword(password);
    if (!match) return res.status(400).send({ message: "Invalid Credentials" });
    const accessToken = generateAccesssToken({ email, id: isUser._id });
    const refreshToken = generateRefreshToken({ email, id: isUser._id });
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .send({ messgae: "Login Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.messge });
  }
};

//forget-pass
const forgetpass = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).send({ message: "Please Enter your email" });
    const resetToken = hashtoken;
    const isUser = await user.findOneAndUpdate(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      },
      { returnDocument: "after" },
    );
    if (!isUser)
      return res.status(400).send({ message: "This email is not registered" });
    const resetUrl = `http://localhost:8000/${process.env.BASE_URL}/resetPassword?id=${isUser._id}&token=${token}`;
    await info(
      email,
      "Reset Password Link",
      resetPassTemplate(isUser.name, resetUrl),
    );
    return res
      .status(200)
      .send({ msg: "A reset Link has been sent to your mail" });
  } catch (err) {
    console.log(err);
  }
};


//resetPassword

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hashtoken = crypto.createHash("sha256").update(token).digest("hex");
    if (!password)
      return res.status(400).send({ message: "Please Enter your Password" });
    const passvalid=passwordvalidation(password);
    if(Object.keys(passvalid).length!=0) return res.status(400).send({message:"Invalid Password"});
    const isUser = await user.findOne(
      {
        resetToken: hashtoken,
        resetTokenExpires: { $gt: Date.now() },
      }
    );
    if (!isUser) return res.status(400).send({ message: "Invalid Request" });
    isUser.password=password;
    isUser.resetToken=null;
    isUser.resetTokenExpires=null;
    await isUser.save();
    return res.status(200).send({message:"Password Updated Successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = { loginControllers, forgetpass, resetPassword };
