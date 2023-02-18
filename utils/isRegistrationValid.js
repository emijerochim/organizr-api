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

const isRegistrationValid = async (username, email, password) => {
  const isUsernameAvailable = !(await User.findOne({ username: username }));
  const IsEmailAvailable = !(await User.findOne({ email: email }));

  const isEmailValid = async (email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const isPasswordValid = async (password) =>
    /(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password);

  return (
    isUsernameAvailable && isEmailValid && IsEmailAvailable && isPasswordValid
  );
};

module.exports = isRegistrationValid;
