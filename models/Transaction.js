const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactions: [
    {
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
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
