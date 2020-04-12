// Express documentation: https://expressjs.com/en/api.html

/* Import the express npm nodule */
const express = require('express')

const UserController = require('./UserController');
const userController = new UserController();

/* Import the body-parser module. (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object */
const app = express()
const port = 3000

/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');

/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));

/* Display all leaders */
app.get('/leaders', (req, res) => {
    userController.leaders(req, res);
});

app.get('/index.html', (req, res) => {
    userController.home(req,res);
});

/* Display all users */
app.get('/users', (req, res) => {
    userController.index(req, res);
});

/* Create a new user */
app.post('/users', (req, res) => {
    userController.create(req, res);
});

/* Display a form to create a new user */
app.get('/users/new', (req, res) => {
    userController.newUser(req, res);
});

/* Display details for one user.
   :id represents a "route parameter" */
app.get('/users/:id', (req, res) => {
    userController.show(req, res);
});

/* Delete a user */
app.get('/users/:id/destroy', (req, res) => {
    userController.destroy(req, res);
});

/* Edit a user */
app.get('/users/:id/edit', (req, res) => {
    userController.edit(req, res);
});

/* Update a user */
app.post('/users/:id', (req, res) => {
    userController.update(req, res);
});

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
