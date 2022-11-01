const isEmailValid = require("./isEmailValid");
const isPasswordValid = require("./isPasswordValid");
const isEmailAvailable = require("./isEmailAvailable");
const isUsernameAvailable = require("./isUsernameAvailable");

const validateRegistration = (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (isUsernameAvailable(username)) {
    console.log("Username available 👽✔️");
  } else {
    console.log("Username available 📧🚫");
    return res.status(400).json("Username is not available");
  }

  if (isEmailValid(email)) {
    console.log("Email valid 📧✔️");
  } else {
    console.log("Email invalid 📧🚫");
    return res.status(400).json("Email is not valid");
  }

  if (isEmailAvailable(email)) {
    console.log("Email available 📧✔️");
  } else {
    console.log("Email available 📧🚫");
    return res.status(400).json("Email is not available");
  }

  if (isPasswordValid(password)) {
    console.log("Password valid 🔒✔️");
  } else {
    console.log("Password invalid 🔒🚫");
    return res.status(400).json("Password is not valid");
  }

  return true;
};

module.exports = validateRegistration;
