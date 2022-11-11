const categories = [
  {
    name: "Balance Update",
    color: "#0000FF",
    type: "balance",
  },
  {
    name: "Food",
    color: "#FFC0CB",
    type: "expense",
  },
  {
    name: "Transport",
    color: "#FFA500",
    type: "expense",
  },
  {
    name: "Clothes",
    color: "#FF0000",
    type: "expense",
  },
  {
    name: "Entertainment",
    color: "#FF00FF",
    type: "expense",
  },
  {
    name: "Bills",
    color: "#FFD700",
    type: "expense",
  },
  {
    name: "Health",
    color: "#FF69B4",
    type: "expense",
  },
  {
    name: "Salary",
    color: "#00FF00",
    type: "income",
  },
  {
    name: "Investments",
    color: "#00FFFF",
    type: "income",
  },
  {
    name: "Gift",
    color: "#FFFF00",
    type: "income",
  },
];

const transactions = [
  {
    amount: 0,
    date: new Date(),
    description: "Initial balance",
    category: [categories[0]],
  },
];

const initialUserState = {
  transactions,
  categories,
};

module.exports = initialUserState;
