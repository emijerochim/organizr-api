const isPasswordValid = (password) => {
  return String(password)
    .toLowerCase()
    .match(/(?=.*\d)(?=.*[a-zA-Z]).{8,}/);
};

module.exports = isPasswordValid;
