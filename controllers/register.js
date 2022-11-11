const User = require("../models/User");
const bcrypt = require("bcrypt");
const validateRegistration = require("../utils/validateRegistration");
const initialUserState = require("../utils/initialUserState");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const isUserValid = await validateRegistration(username, email, password);

  if (!isUserValid) {
    console.log("\nUser not added 🚫");
    return res.status(400).json("Registration request is invalid");
  }

  const hash = bcrypt.hashSync(password, 10);
  const newUser = new User(
    {
      username,
      email,
      password: hash,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  initialUserState.transactions.forEach((transaction) => {
    newUser.transactions.push(transaction);
  });
  initialUserState.categories.forEach((category) => {
    newUser.categories.push(category);
  });
  newUser.save();

  console.log("\nNew user added 👍");
  res.json(newUser);
};

module.exports = { handleRegister };
