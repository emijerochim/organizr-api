const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) {
    console.log("Username not found on login 🚫");
    return res.status(400).json("\nUser not found on login 🚫");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("\nPassword incorrect 🚫");
    return res.status(401).json("\nPassword incorrect 🚫");
  }

  jwt.sign({ user }, "secretKey", { expiresIn: "7d" }, (err, token) => {
    res.status(200).json({
      token,
      user,
    });
  });
};

module.exports = { handleLogin };
