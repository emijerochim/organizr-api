const User = require("../models/User");
const validateSignIn = require("../utils/validateSignIn");

const handleSignIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const isUserValid = await validateSignIn(username, password);

  if (!isUserValid) {
    console.log("\nUser not found or password incorrect 🚫");
    return res.status(400).json("Sign in request is invalid");
  }

  res.json(user);
};

module.exports = { handleSignIn };
