const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateLogin = require("../utils/validateLogin");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user) {
    console.log("Username not found on login 🚫");
    return res.status(400).json("\nUser not found on login 🚫");
  }
  if (!isPasswordValid) {
    console.log("\nPassword incorrect on login 🚫");
    return res.status(401).json("\nPassword incorrect on login 🚫");
  }

  if (!isUserValid) {
    return res.status(400).json("Sign in request is invalid");
  }

  jwt.sign({ user }, "secretKey", { expiresIn: "7d" }, (err, token) => {
    res.status(200).json({
      token,
      user,
    });
  });
};

module.exports = { handleLogin };
