const User = require("../models/User.js");

const getCategories = async (req, res, username, type) => {
  try {
    const categories = await User.find(
      type ? { username: username, type: type } : { username: username }
    ).categories;

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = await Category.create(req.body);
    return res.status(201).json({
      success: true,
      data: category,
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

const updateCategory = async (req, res, newCategory) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: "No category found",
      });
    }

    await Category.findByIdAndUpdate(req.params.id, newCategory, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: newCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: "No category found",
      });
    }
    await category.remove();
    return res.status(200).json({
      success: true,
      data: {},
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
