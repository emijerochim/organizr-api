const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateLogin = require("../utils/validateLogin");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(400).json("User not found");
  }

  const isUserValid = await validateLogin(username, password);

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
