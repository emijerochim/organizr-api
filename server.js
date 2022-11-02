require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const users = require("./controllers/users");

//middlewares
const app = express();
app.use(express.json());
app.use(cors());

//checking connections
app.listen(process.env.API_PORT, async (error) => {
  if (error) {
    console.log("Error with server 🚫\n ", error);
  }
  console.log("Server up! 👍 \n localhost:", process.env.API_PORT);
});
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database ✔️ \n ", process.env.DB_URL);
  })
  .catch((error) => {
    console.log("Error connecting to database 🚫\n ", error);
  });

//routes
app.get("/", (req, res) => {
  res.send("success!!!");
});

app.get("/users", (req, res) => {
  users.handleUsers(req, res);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt);
});

app.post("/signin", (req, res, bcrypt) => {
  signIn.handleSignIn(req, res, bcrypt);
});
