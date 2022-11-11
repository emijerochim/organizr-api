const mongoose = require("mongoose");
const Category = require("./Category.js");

const transactionSchema = new mongoose.Schema({
  transactions: [
    {
      amount: {
        type: "Number",
      },
      date: {
        type: "Date",
      },
      description: {
        type: "String",
      },
      category: {
        type: [Category.categorySchema],
      },
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
