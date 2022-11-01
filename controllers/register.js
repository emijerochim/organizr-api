const User = require("../models/User");
const validateRegistration = require("../utils/validateRegistration");

const handleRegister = (req, res, bcrypt) => {
  const { username, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  validateRegistration(req, res);

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

  newUser.save();
  console.log("New user added 👍");

  res.json(newUser);
};

module.exports = { handleRegister };
