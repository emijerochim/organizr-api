const User = require("../models/User");
const bcrypt = require("bcrypt");

const validateLogin = async (username, password) => {
  const user = await User.findOne({ username: username });
  const isUsernameValid = username === user.username;
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isUsernameValid) {
    console.log("\nUsername not found 🚫");
  }
  if (!isPasswordValid) {
    console.log("\nPassword incorrect 🚫");
  }

  return isUsernameValid && isPasswordValid;
};

module.exports = validateLogin;
