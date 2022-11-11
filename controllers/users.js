const User = require("../models/User.js");

const getUsers = async (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
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
    }
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
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
