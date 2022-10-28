require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const knex = require("knex");
const mongoose = require("mongoose");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const User = require('./models/User');

//middlewares
const app = express();
app.use(express.json());
app.use(cors());

//checking connections
app.listen(process.env.PORT, async () => {
  console.log("Server up! 👍 \n localhost:", process.env.API_PORT);
});

mongoose.connect(process.env.DB_URL, {})
  .then(() => {
    console.log("Connected to database ✔️ \n ", process.env.DB_URL);
  })
  .catch((e) => {
    console.log("Error connecting to database 🚫\n ", e, "Error connecting to database 🚫\n ");
  });


//endpoints
app.get("/", (req, res) => {
  res.send("success!!!");
});

app.post("/signIn", signIn.handleSignIn(bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res);
});
