const isEmailValid = require("../utils/isEmailValid");
const isPasswordValid = require("../utils/isPasswordValid");

const User = require('../models/User');

const handleRegister = (req, res, bcrypt) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  
  if (!username || !isEmailValid(email) || !isPasswordValid(password)) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hash(password, 10);

  User.create({
    username, email, password
  } , err => {
    if(err){
      console.log(err);
    }
  })

};

module.exports = { handleRegister };
