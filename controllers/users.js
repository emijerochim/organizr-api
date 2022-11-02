const User = require("../models/User");

const handleUsers = async (req, res) => {
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

module.exports = { handleUsers };
