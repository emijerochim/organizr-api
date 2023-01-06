const User = require("../models/User.js");

const getTransactions = async (req, res, username) => {
  try {
    const users = await User.find({ username: username });
    const transactions = users[0].transactions;

    return res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const addTransaction = async (req, res, username) => {
  try {
    const user = await User.findOne({ username: username });

    const transaction = {
      id: req.body.id,
      amount: req.body.amount,
      date: new Date(req.body.date),
      description: req.body.description,
      category: req.body.category,
    };
    user.transactions.push(transaction);

    await User.updateOne({ username: username }, { $set: user });

    return res.status(201).json({
      success: true,
      data: user.transactions,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

const updateTransaction = async (req, res, username) => {
  try {
    const user = await User.findOne({ username: username });
    user.transactions.forEach((transaction) => {
      if (transaction.id === req.body.id) {
        transaction.amount = req.body.amount;
        transaction.date = req.body.date;
        transaction.description = req.body.description;
        transaction.category = req.body.category;
      }
    });

    User.updateOne({ username: username }, user, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await user.save();

    return res.status(200).json({
      success: true,
      data: user.transactions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteTransaction = async (req, res, username) => {
  try {
    const user = await User.findOne({ username: username });
    user.transactions.forEach((transaction, index) => {
      if (transaction.id === req.body.id) {
        user.transactions.splice(index, 1);
      }
    });

    User.updateOne({ username: username }, user, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await user.save();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
