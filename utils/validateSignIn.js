const User = require("../models/User");
const bcrypt = require("bcrypt");

const validateSignIn = async (username, password) => {
  const user = await User.findOne({ username: username });
  const isUsernameValid = username === user.username;
  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isUsernameValid && isPasswordValid;
};

module.exports = validateSignIn;
