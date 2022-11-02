const User = require("../models/User");

const getUsers = async (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    }
    var userMap = {};
    users.forEach((user) => {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};

const getUser = async (req, res) => {
  User.find({ username: req.params.username }, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
};

module.exports = { getUsers, getUser };
