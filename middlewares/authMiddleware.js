const jwt = require("jsonwebtoken");
const { verify } = require("../helpers/loginUtils");

const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = await req.cookies;
    const decoded = await verify(accessToken);
    if (decoded) { 
       req.user = decoded;
       return next();
    }
    return res.status(401).json({
      success:false,
      message:"Unauthorized request"  
    })
  } catch (err) {
    console.error(err);
    return (
      res.status(401).
      json({
        success:false, 
        message: "You are not Unauthorized ",
      })
    );
  }
};


module.exports=authMiddleware
