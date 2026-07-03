const usermodel = require("../../models/userSchema");
const {
  fieldValidate,
  validation,
  generateOtp,
  otpVerifyValidate,
} = require("../../helpers/utils");
const info = require("../../helpers/mailService");

const registrationController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const fieldrequire = fieldValidate(name, email, password);
    if (Object.keys(fieldrequire).length != 0) {
      return res.status(400).send({ fieldrequire });
    }
    const fieldvalidation = validation(email, password);
    if (Object.keys(fieldvalidation).length != 0) {
      return res.status(400).send({ fieldvalidation });
    }
    const isUser = await usermodel.findOne({ email });

    if (isUser)
      return res.status(400).send({ messge: "This user already registered" });

    const otp = generateOtp();

    const user = await usermodel.create({
      name,
      email,
      password,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });
    await info(email, otp);
    res
      .status(201)
      .json({ msg: "Registered initilized Please verify your email", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const errmsg = otpVerifyValidate(email, otp);
    if (Object.keys(errmsg).length != 0)
      return res.status(400).send({ errmsg });

    const existingUser = await usermodel.findOneAndUpdate(
      {
        email,
        otp,
        otpExpires: { $gt: Date.now() },
      },
      { otp: null, isVerified: true },
      { returnDocument: "after" },
    );
    if(!existingUser) return res.status(400).send({msg:"Invalid User"});
    return res.status(200).send({msg:"Email verified successfully"})
  } catch (err) {
     res.status(500).send({msg:err.message});
  }
};

module.exports = { registrationController, verifyOtp };
