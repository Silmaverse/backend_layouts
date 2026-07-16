const jwt = require("jsonwebtoken");
const { verify } = require("../helpers/loginUtils");

//verify the user and generate a token
const protect = async (req, res, next) => {
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

//2 .Gatekeeper : Ensure the user is approved

const ensureApprove= async (req,res,next)=>{
  if(req.user && req.user.status==="approved"){
    next()
  }else{
    console.log(req.user.status)
    return res.status(403).json({
      success:false,
      message:"Access is denied, Need approval from Superadmin" 
    })
  }
}

//3 .RBAC: Restrict route access to specify roles only
const  authorizeRoles = (...roles)=>{
  return (req,res,next)=>{
    console.log(req.user)
    if(!roles.includes(req.user.role)){
      return res.status(403).json({
        success:false,
        message:"Role is not authorized to access this resource"
      })
    }
    next();
  }
} 


module.exports={protect, ensureApprove ,authorizeRoles}
