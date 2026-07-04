const jwt = require("jsonwebtoken");
const crypto=require('crypto');
//login helpers

const loginfieldValidate = function loginfieldValidate(email, password) {
  const errormsg = {};
  if (!email) errormsg.emailError = "Please enter your email";
  if (!password) errormsg.passwordError = "Please enter your password";

  return errormsg;
};


const cookieConfig={

  httpOnly:true,
  secure:false,
  sameSite:"strict"

}

const generateAccesssToken = function generateAccesssToken(payload) {
  const option = { expiresIn: "2h" };
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, option);
};

const generateRefreshToken = function generateRefreshToken(payload) {
  const option = { expiresIn: "15d" };
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, option);
};

const generateresetPassToken=function generateresetPassToken(payload){
  const token=crypto.randomBytes(16).toString('hex');
  const hashtoken=crypto.createHash('sha256').update(token).digest('hex');
  return hashtoken;
}

module.exports = { loginfieldValidate, generateAccesssToken ,generateRefreshToken,generateresetPassToken};
