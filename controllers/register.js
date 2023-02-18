const User = require("../models/User");
const bcrypt = require("bcrypt");
const initialUserState = require("../utils/initialUserState");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;

  const isEmailValid = async (email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const isPasswordValid = async (password) =>
    /(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password);

  const isUsernameValid = async (username) => {
    username.length > 3 && username.length < 20;
  };

  const isEmailAvailable = !(await User.findOne({ email: email }));
  const isUsernameAvailable = !(await User.findOne({ username: username }));

  if (!(await isUsernameAvailable(username))) {
    console.log("\nUsername not available on registration 🚫");
    return res.status(402).json("Username not available on registration 🚫");
  }
  if (!(await isEmailAvailable(email))) {
    console.log("\nEmail not available on registration 🚫");
    return res.status(403).json("Email not available on registration 🚫");
  }
  if (!(await isEmailValid(email))) {
    console.log("\nIncorrect format for email on registration 🚫");
    return res
      .status(400)
      .json("Incorrect format for email on registration 🚫");
  }
  if (!(await isPasswordValid(password))) {
    console.log("\nIncorrect format for password on registration 🚫");
    return res
      .status(401)
      .json("Incorrect format for password on registration 🚫");
  }
  if (!(await isUsernameValid(username))) {
    console.log("\nIncorrect format for username on registration 🚫");
    return res
      .status(404)
      .json("Incorrect format for username on registration 🚫");
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
  res.status(200).json(newUser);
  console.log("\nUser added ✅");
};

module.exports = { handleRegister };
