const jwt = require("jsonwebtoken");

//login helpers

const loginfieldValidate = function loginfieldValidate(email, password) {
  const errormsg = {};
  if (!email) errormsg.emailError = "Please enter your email";
  if (!password) errormsg.passwordError = "Please enter your password";

  return errormsg;
};

const generateAccesssToken = function generateAccesssToken(payload) {
  const option = { expiresIn: "15d" };
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, option);
};

module.exports = { loginfieldValidate, generateAccesssToken };
