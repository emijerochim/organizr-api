const User = require("../models/User.js");

const getUser = async (req, res) => {
  User.find({ username: req.params.username }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
    res.send(user);
  });
};

const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User(
    {
      username,
      email,
      password,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  newUser.save();
  console.log("\nNew user added 👍");
  res.json(newUser);
};

const updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
};

const deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
