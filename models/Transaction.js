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
      description: {
        type: "String",
      },
      category: {
        type: "String",
      },
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
