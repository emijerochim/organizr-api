const validateEmail = require("./validateEmail");
const validatePassword = require("./validatePassword");
const User = require("../models/User");

const validateRegistration = async (username, email, password) => {
  const isUsernameAvailable = !(await User.findOne({ username: username }));
  const IsEmailAvailable = !(await User.findOne({ email: email }));
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isUserValid =
    isUsernameAvailable && isEmailValid && IsEmailAvailable && isPasswordValid;

  return isUserValid;
};

module.exports = validateRegistration;
