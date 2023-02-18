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
  const isEmailAvailable = !(await User.findOne({ email: email }));
  const isUsernameAvailable = !(await User.findOne({ username: username }));

  if (!(await isEmailValid)) {
    return res.status(400).json({ message: "Email is not valid" });
  }
  if (!(await isPasswordValid)) {
    return res.status(401).json({ message: "Password is not valid" });
  }
  if (!isEmailAvailable) {
    return res.status(402).json({ message: "Email is already taken" });
  }
  if (!isUsernameAvailable) {
    return res.status(403).json({ message: "Username is already taken" });
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
  res.json(newUser);
};

module.exports = { handleRegister };
