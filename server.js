require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const users = require("./controllers/users");
const transactions = require("./controllers/transactions");

//middlewares
const app = express();
app.use(express.json());
app.use(cors());

//checking connections
app.listen(process.env.API_PORT, async (error) => {
  if (error) {
    console.log("\n Error with server 🚫\n ", error);
  }
  console.log("\n Server up! 👍 \n localhost:", process.env.API_PORT);
});
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("\n Connected to database ✔️ \n ", process.env.DB_URL);
  })
  .catch((error) => {
    console.log("\n Error connecting to database 🚫\n ", error);
  });

//routes
app.get("/", (req, res) => {
  res.send("success!!!");
});

app.get("/users", (req, res) => {
  users.getUsers(req, res);
});
app.get("/:username", (req, res) => {
  users.getUser(req, res);
});

app.get("/transactions", (req, res) => {
  transactions.getTransactions(req, res);
});
app.get("/transactions/:username", (req, res) => {
  transactions.getTransactionsOf(req, res);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res);
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res);
});
