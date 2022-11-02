const User = require("../models/User");
const bcrypt = require("bcrypt");

const validateSignIn = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return false;
  }
  const isEmailValid = email === user.email;
  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isEmailValid && isPasswordValid;
};

module.exports = validateSignIn;
