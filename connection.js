const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL)
.then(() => {
  console.log("Connected to database ✔️ \n ", process.env.DB_URL);
})
.catch((error) => {
  console.log("Error connecting to database 🚫\n ", error, "Error connecting to database 🚫\n ");
});
