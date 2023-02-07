const User = require("../models/User.js");

const getCategories = async (req, res, username = {}) => {
  try {
    const users = await User.find({ username: username });
    const categories = users[0].categories;

    return res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const addCategory = async (req, res, username) => {
  try {
    const user = await User.findOne({ username: username });

    const category = {
      id: req.body.id,
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
    };
    user.categories.push(category);

    await User.updateOne({ username: username }, { $set: user });

    return res.status(201).json(category);
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

const updateCategory = async (req, res, username) => {
  try {
    const user = await User.findOne({ username: username });
    user.categories.forEach((category) => {
      if (category.id === req.body.id) {
        category.name = req.body.name;
        category.color = req.body.color;
        category.type = req.body.type;
      }
    });
    user.transactions.forEach((transaction) => {
      if (transaction.category.id === req.body.id) {
        transaction.category.name = req.body.name;
        transaction.category.color = req.body.color;
        transaction.category.type = req.body.type;
        if (transaction.category.type === "income") {
          transaction.amount = Math.abs(transaction.amount);
        } else {
          transaction.amount = -Math.abs(transaction.amount);
        }
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
      categories: user.categories,
      transactions: user.transactions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteCategory = async (req, res, username) => {
  try {
    const user = await User.findOne({ username: username });
    user.categories.forEach((category, index) => {
      if (category.id === req.body.id) {
        user.categories.splice(index, 1);
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
      categories: user.categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
