const User = require("../models/User.js");
const { v4: uuidv4 } = require("uuid");

const getTransactions = async (req, res) => {
  try {
    const users = await User.find({ username: req.params.username });
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
    const id = uuidv4();

    const transaction = {
      id: id,
      amount: req.body.amount,
      date: new Date(req.body.date),
      description: req.body.description,
    };

    user.categories.filter((category) => {
      if (category.name === req.body.category) {
        transaction.category = category;
      }
    });
    user.transactions.push(transaction);

    User.updateOne({ username: username }, user, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await user.save();

    return res.status(201).json({
      success: true,
      data: transaction,
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
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteTransaction = async (req, res, username, id) => {
  try {
    const user = await User.findOne({ username: username });
    const transaction = user.transactions.filter((transaction) => {
      if (transaction.id === id) {
        transaction = null;
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
      data: transaction,
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
