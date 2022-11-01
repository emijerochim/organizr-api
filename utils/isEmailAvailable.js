const User = require("../models/User");

const isEmailAvailable = async (email) => {
  const user = await User.findOne({ email: email });
  return user ? false : true;
};

module.exports = isEmailAvailable;
