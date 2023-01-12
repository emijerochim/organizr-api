const { v4: uuidv4 } = require("uuid");

const categories = [
  {
    id: uuidv4(),
    name: "Balance Update",
    color: "#AEC0B1",
    type: "balance",
  },
  {
    id: uuidv4(),
    name: "Food",
    color: "#FF0031",
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Transport",
    color: "#FF4E00",
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Clothes",
    color: "#FA0705",
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Entertainment",
    color: "#FF00B1",
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Bills",
    color: "#FA8205",
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Health",
    color: "#FA057D",
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Salary",
    color: "#16E973",
    type: "income",
  },
  {
    id: uuidv4(),
    name: "Investments",
    color: "#22E916",
    type: "income",
  },
  {
    id: uuidv4(),
    name: "Gift",
    color: "#00FF8F",
    type: "income",
  },
];

const transactions = [
  {
    id: uuidv4(),
    amount: 0,
    date: new Date(),
    description: "Initial balance",
    category: categories[0],
  },
];

const initialUserState = {
  transactions,
  categories,
};

module.exports = initialUserState;
