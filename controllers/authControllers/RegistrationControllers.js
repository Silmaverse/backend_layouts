const usermodel = require("../../models/userSchema");

const RegistrationController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    res.status(400).send({message:"Please Enter your email"});
  }
  if(!email){
    res.status(400).send({message:"Please Enter your email"})
  }

  const user = await usermodel.create({
    name,
    email,
    password,
  });
  res.status(200).json({ msg: "user created successfully", user });
};

module.exports = RegistrationController;
