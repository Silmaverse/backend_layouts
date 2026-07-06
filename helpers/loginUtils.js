const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//login helpers

const loginfieldValidate = function loginfieldValidate(email, password) {
  const errormsg = {};
  if (!email) errormsg.emailError = "Please enter your email";
  if (!password) errormsg.passwordError = "Please enter your password";

  return errormsg;
};
//password validation
const passwordvalidation = function passwordvalidation(password) {
  const errormsg = {};
  const passpattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passpattern.test(password)) errormsg.password = "Invalid Password";
  return errormsg;
};
//cookie config
const cookieConfig = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
};

//accessToken generate
const generateAccesssToken = function generateAccesssToken(payload) {
  const option = { expiresIn: "2h" };
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, option);
};

//refreshToken
const generateRefreshToken = function generateRefreshToken(payload) {
  const option = { expiresIn: "15d" };
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, option);
};

//resetPassToken
const generateresetPassToken = function generateresetPassToken() {
  const token = crypto.randomBytes(16).toString("hex");
  const hashtoken = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hashtoken };
};

module.exports = {
  loginfieldValidate,
  generateAccesssToken,
  generateRefreshToken,
  generateresetPassToken,
  passwordvalidation,
  cookieConfig
};
