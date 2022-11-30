require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const verifyToken = require("./utils/verifyToken");
const register = require("./controllers/register");
const Login = require("./controllers/login");
const users = require("./controllers/users");
const transactions = require("./controllers/transactions");
const categories = require("./controllers/categories");

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
    console.log("\n Connected to database ✔️ \n ");
  })
  .catch((error) => {
    console.log("\n Error connecting to database 🚫\n ", error);
  });

//ROUTES
app.get("/", verifyToken, (req, res) => {
  res.send("success!!!");
});
app.post("/login", (req, res) => {
  Login.handleLogin(req, res);
});

//USERS CRUD
app.get("/users/:username", (req, res) => {
  users.getUser(req, res, req.params.username);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res); //addUser
});
app.put("/users/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : users.updateUser(req, res);
  });
});
app.delete("/users/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : users.deleteUser(req, res);
  });
});

app.post("/verify-token", (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(authData);
  });
});

//TRANSACTIONS CRUD
app.get("/transactions", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : transactions.getTransactions(req, res);
  });
});
app.get("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.getTransactions(req, res, req.params.username);
  });
});
app.post("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.addTransaction(req, res, req.params.username);
  });
});
app.put("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.updateTransaction(req, res, req.params.username);
  });
});
app.delete("/transactions/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : transactions.deleteTransaction(req, res);
  });
});

//CATEGORIES CRUD
app.get("/categories", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : categories.getCategories(req, res);
  });
});
app.get("/categories/:username", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : categories.getCategories(req, res, req.params.username);
  });
});
app.post("/categories", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : categories.addCategory(req, res);
  });
});
app.put("/categories/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : categories.updateCategory(req, res);
  });
});
app.delete("/categories/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : categories.deleteCategory(req, res);
  });
});
