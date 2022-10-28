## 📋 organizr-api

It auths the login with a users database in MongoDB Atlas, gets transactions from the backend API, shows them in a month or year view using Chart.js for the data visualization and Moment.js for the calendar

_________________________

### 📱 Frontend
* HTML5, CSS3, SASS, React.js

### 🖥️ Backend
* Node.js, Express, Mongoose

### 💾 Database
* MongoDB Atlas

### 🧰 Tools
* Git, VS Code, Nodemon, Trello

### 📚 Libraries
* Moment.js, Chart.js

### 📂 Database
```
{
 "username": String,
 "email": String,
 "password": String,

 "transactions": [{
  "date": ISODate,
  "amount": Number,
  "label": String,
  "category": String,
  "repeatable": Boolean
 }],

 "categories": [{
  "name": String,
  "color": String, //hexcode
  "type": String
 }]
}
```
________________

### Frontend code:
* [github.com/emijerochim/organizr](http://github.com/emijerochim/organizr)

### Backend code:
* [github.com/emijerochim/organizr-api](http://github.com/emijerochim/organizr-api)

### Demo:
* [emijerochim.com/organizr](http://github.com/emijerochim/organizr-api)

