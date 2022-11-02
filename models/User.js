const mongoose = require("mongoose");
const Transaction = require("./Transaction");

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
  categories: [
    {
      id: {
        type: "Number",
      },
      name: {
        type: "String",
      },
      color: {
        type: "String",
      },
      type: {
        type: "String",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
