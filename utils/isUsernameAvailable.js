const User = require("../models/User");

const isEmailAvailable = async (username) => {
  const user = await User.findOne({ username: username });
  return user ? false : true;
};

module.exports = isEmailAvailable;
