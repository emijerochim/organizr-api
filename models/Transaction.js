const mongoose = require("mongoose");
const Category = require("./Category.js");

const transactionSchema = new mongoose.Schema({
  transactions: [
    {
      id: {
        type: String,
      },
      date: {
        type: "Date",
      },
      amount: {
        type: "Number",
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
