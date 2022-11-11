const mongoose = require("mongoose");
const Transaction = require("./Transaction");
const Category = require("./Category");

const userSchema = new mongoose.Schema({
  username: {
    type: "String",
  },
  email: {
    type: "String",
  },
  password: {
    type: "String",
  },
  transactions: {
    type: [Transaction.transactionSchema],
  },
  categories: {
    type: [Category.transactionSchema],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
