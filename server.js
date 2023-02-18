require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const verifyToken = require("./controllers/verifyToken");
const register = require("./controllers/register");
const login = require("./controllers/login");
const users = require("./controllers/users");
const transactions = require("./controllers/transactions");
const categories = require("./controllers/categories");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`\n Connected to database ✔️ \n ${process.env.MONGO_URL}`);
  })
  .catch((error) => {
    console.log("\n Error connecting to database 🚫\n ", error);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send();
});

app.get("/", verifyToken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(authData);
  });
});
app.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  login.handleLogin(req, res);
});

app.post("/verify-token", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : res.json(authData);
  });
});

//USERS CRUD
app.get("/users/:username", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  users.getUser(req, res, req.params.username);
});
app.post("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  register.handleRegister(req, res); //addUser
});
app.put("/users/:id", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : users.updateUser(req, res);
  });
});
app.delete("/users/:id", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : users.deleteUser(req, res);
  });
});

//TRANSACTIONS CRUD
app.get("/transactions", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : transactions.getTransactions(req, res);
  });
});
app.get("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.getTransactions(req, res, req.params.username);
  });
});
app.post("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.addTransaction(req, res, req.params.username);
  });
});
app.put("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.updateTransaction(req, res, req.params.username);
  });
});
app.delete("/transactions/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : transactions.deleteTransaction(req, res, req.params.username);
  });
});

//CATEGORIES CRUD
app.get("/categories", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err ? res.sendStatus(403) : categories.getCategories(req, res);
  });
});
app.get("/categories/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : categories.getCategories(req, res, req.params.username);
  });
});
app.post("/categories/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : categories.addCategory(req, res, req.params.username);
  });
});
app.put("/categories/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : categories.updateCategory(req, res, req.params.username);
  });
});
app.delete("/categories/:username", verifyToken, (req, res) => {
  jwt.verify(req.body.token, "secretKey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : categories.deleteCategory(req, res, req.params.username);
  });
});

app.listen(process.env.PORT, async (error) => {
  if (error) {
    console.log("\n Error with server 🚫\n ", error);
  }
  console.log("\n Server up! 👍 \n localhost:", process.env.PORT);
});
