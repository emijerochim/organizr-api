const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categories: {
    name: {
      type: "String",
    },
    color: {
      type: "String",
    },
    description: {
      type: "String",
    },
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
