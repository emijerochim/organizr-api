const mongoose = require("mongoose");

const userSchema = new mongoose.Schema();
userSchema.add({
  username: {
    type: "String",
  },
  email: {
    type: "String",
  },
  password: {
    type: "String",
  },
  transactions: [
    {
      id: {
        type: "Number",
      },
      date: {
        type: "Date",
      },
      amount: {
        type: "Number",
      },
      label: {
        type: "String",
      },
      category: {
        type: "String",
      },
      repeatable: {
        type: "Boolean",
      },
    },
  ],
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
  ]});
  
const User = mongoose.model("User", userSchema);

module.exports = User;