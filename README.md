## 👁️‍🗨️ organizr-api

<div>
  <img src="https://github.com/emijerochim/organizr/blob/master/src/assets/1.jpg" height="350px">
  <img src="https://github.com/emijerochim/organizr/blob/master/src/assets/2.PNG" height="350px">
  <img src="https://github.com/emijerochim/organizr/blob/master/src/assets/3.jpg" height="350px">
  <img src="https://github.com/emijerochim/organizr/blob/master/src/assets/4.jpg" height="350px">
</div>


<br></br>
## Installation ▶️ 

1. Clone the repository
```git clone https://github.com/emijerochim/organizr-api.git```

2. Enter into the project folder
```cd organizr-api```

3. Install the required packages
```npm install```

4. Create a `.env` file in the project directory and set the environment variables

5. Run the code with `npm start`

<br></br>

## Stack 🧰

### 📱 Frontend
* HTML5, CSS3, SASS, React.js

### 🖥️ Backend
* Node.js, Express, Mongoose

### 💾 Database
* MongoDB

### 🧰 Tools
* Git, VS Code, Nodemon, Trello

### 📚 Libraries
* JWT, Moment.js

### ☁️ Deploy
* Railway

<br></br>
## Dependencies 📚

The following packages are required to run this code:

- `bcrypt` for hashing passwords
- `cors` for handling Cross-Origin Resource Sharing (CORS)
- `dotenv` for loading environment variables from a `.env` file
- `express` for creating the web server
- `jsonwebtoken` for handling JSON web tokens for authentication
- `moment` for working with dates and times
- `mongoose` for interacting with a MongoDB database
- `uuid` for generating unique identifiers


<br></br>
## Endpoints 🛠️

The code creates an Express.js app and sets up the following routes:

- `GET /` : a protected route that requires a valid JSON web token to access. Returns the decoded token data if the token is valid.
- `POST /login` : a route that logs in a user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the login is successful.
- `POST /verify-token`: a route that verifies the validity of a JSON web token. Returns a 403 status code if the token is invalid, or the decoded token data if the token is valid.

- `GET /users/:username` : a route that gets user information for a specific `username`.
- `POST /register` : a route that registers a new user. Accepts a `username`, `password`, and `email` in the request body, and returns a JSON web token if the registration is successful.
- `PUT /users/:id` : a protected route that requires a valid JSON web token to access. Updates the user information for a specific `id`. Accepts an `email` in the request body.
- `DELETE /users/:id` : a protected route that requires a valid JSON web token to access. Deletes the user with the specified `id`.

- `GET /transactions/:username` : a protected route that requires a valid JSON web token to access. Returns all transactions for a specific `username`.
- `POST /transactions/:username` : a protected route that requires a valid JSON web token to access. Adds a new transaction for a specific `username`. Accepts `description`, `amount`, and `category` in the request body.
- `PUT /transactions/:username` : a protected route that requires a valid JSON web token to access. Updates a transaction for a specific `username`. Accepts an `id`, `description`, `amount`, and `category` in the request body.
- `DELETE /transactions/:username/:id` : a protected route that requires a valid JSON web token to access. Deletes a transaction for a specific `username` and `id`.

The code also connects to a MongoDB database using the `mongoose` package, and includes a `verifyToken` middleware function to handle protected routes.

<br></br>
## Environment Variables 🔐️

The following environment variables are used in this code:

- `MONGO_URL` : the URL of the MongoDB database
- `JWT_KEY` : the secret key to sign JSON web tokens with
- `PORT` : the port number to run the web server on

<br></br>
## Logs 🗃️


The database connects successfully:

```Connected to database ✔️ ${process.env.MONGO_URL}```


There's a connection error with the database:

```Error connecting to database 🚫```


The web server started successfully:

```Server up! 👍 localhost: ${process.env.PORT}```

<br></br>
## Contact 👋

*  You can see my portfolio at <a href="https://emijerochim.com/">emijerochim.com</a> 💼
*  Mail me at <a href="mailto:dev@emijerochim.com/">dev@emijerochim.com</a> ✉️

<br></br>
________________

### Frontend code:
* [github.com/emijerochim/organizr](http://github.com/emijerochim/organizr)

### Backend code:
* [github.com/emijerochim/organizr-api](http://github.com/emijerochim/organizr-api)


<br></br>

### [🧠 Try the demo](https://emijerochim.github.io/organizr)
