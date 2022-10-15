//upload web server
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const knex = require("knex");
const mongoose = require("mongoose");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");

const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.URL;
mongoose
  .connect(url, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Error connecting to database");
  });

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema();
userSchema.add({
  username: {
    type: "String",
  },
  email: {
    type: "String",
  },
  password: {
    type: "String",
  },
  transactions: [
    {
      id: {
        type: "Number",
      },
      date: {
        type: "Date",
      },
      amount: {
        type: "Number",
      },
      label: {
        type: "String",
      },
      category: {
        type: "String",
      },
      repeatable: {
        type: "Boolean",
      },
    },
  ],
  categories: [
    {
      id: {
        type: "Number",
      },
      name: {
        type: "String",
      },
      color: {
        type: "String",
      },
      type: {
        type: "String",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

const db = async () => await User.find();

app.get("/", (req, res) => {
  res.send("success!!!");
});

app.listen(process.env.PORT, async () => {
  console.log("app is running on port", process.env.PORT);
});

app.post("/signIn", signIn.handleSignIn(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
