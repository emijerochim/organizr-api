const User = require("../models/User.js");

const getUser = async (req, res, username) => {
  User.find({ username: username }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: user,
    });
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
