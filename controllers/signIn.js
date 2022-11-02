const validateSignIn = require("../utils/validateSignIn");

const handleSignIn = async (req, res) => {
  const { email, password } = req.body;
  const isUserValid = await validateSignIn(email, password);

  if (!isUserValid) {
    console.log("\nUser not found or password incorrect 🚫");
    return res.status(400).json("Sign in request is invalid");
  }

  res.json("Sign in successful");
};

module.exports = { handleSignIn };
