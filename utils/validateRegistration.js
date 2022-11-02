const User = require("../models/User");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  return String(password)
    .toLowerCase()
    .match(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
};

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
