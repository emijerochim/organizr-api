## 📋 organizr-api

It auths the login with a users database in MongoDB Atlas, gets transactions from the backend API, shows them in a month or year view using Chart.js for the data visualization and Moment.js for the calendar

_________________________

### 📱 Frontend
* HTML5, CSS3, SASS, React.js

### 🖥️ Backend
* Node.js, Express, Mongoose

### 💾 Database
* MongoDB

### 🧰 Tools
* Git, VS Code, Nodemon, Trello

### 📚 Libraries
* JWT, Moment.js, Chart.js

### 📂 Database
```
{
 "username": String,
 "email": String,
 "password": String,

 "transactions": [{
  "amount": Number,
  "date": ISODate,
  "description": String,
  "category": [Category.categorySchema]
 }],

 "categories": [{
  "name": String,
  "color": String, //hexcode
  "type": String
 }]
}
```

### ☁️ Deploy
* Railway
________________

### Demo:
* [emijerochim.com/organizr](http://emijerochim.com/organizr)

### Frontend code:
* [github.com/emijerochim/organizr](http://github.com/emijerochim/organizr)

### Backend code:
* [github.com/emijerochim/organizr-api](http://github.com/emijerochim/organizr-api)

