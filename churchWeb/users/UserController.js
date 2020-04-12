let User = require('./User');

/* Demonstrates a simple implementation of standard CRUD operations */
class UserController {
    index(req, res) {
      let users = User.all();
      res.render('userIndex', { users: users });
    }

    leaders(req, res) {
      let users = User.all();
      res.render('leaders', { users: users});
    }

    home(req, res) {
      res.render('home');
    }

    show(req, res) {
      let id = req.params.id;
      let user = User.find(id);

      if (!user) {
        res.send("Could not find user with id of " + id);
      } else {
        res.render('userShow', { user: user });
      }
    }

    newUser(req, res) {
      res.render('userNew', { user: new User() });
    }

    create(req, res) {
      console.log("About to create user");
      console.log(req.body);
      let newUser = User.create(req.body.user);

      if (newUser.isValid()) {

          console.log("New user is valid: ");
          console.log(newUser);

          // Send a redirect to the "show" route for the new user.
          res.writeHead(302, { 'Location': `/users/${newUser.id}` });
          res.end();
      } else {
          res.render('userNew', { user: newUser });
      }
    }

    edit(req, res) {
      let id = req.params.id;
      let user = User.find(id);

      if (!user) {
        res.send("Could not find user with id of " + id);
      } else {
        res.render('userEdit', { user: user });
      }
    }

    destroy(req, res) {
      console.log("About to destroy user");

      let id = req.params.id;
      let user = User.find(id);

      if (!user) {
        res.send("Could not find user with id of " + id);
      } else {
        User.allUsers = User.allUsers.filter(testUser => testUser.id != user.id);
        res.render('userDestroy', { user: user });
        console.log("Destroyed user id = " + user.id);
      }
    }

    update(req, res) {
      let id = req.params.id;
      let user = User.find(id);

      let testUser = new User(req.body.user);
      if (!testUser.isValid()) {
        testUser.id = user.id;
        res.render('userEdit', { user: testUser });
        return;
      }

      if (!user) {
        res.send("Could not find user with id of " + id);
      } else {
        user.lname = req.body.user.lname;
        user.fname = req.body.user.fname;
        user.email = req.body.user.email;
        user.status = req.body.user.status;
        // If using a database, we would need some kind of "save" method here.

        // Send a redirect to the "show" route for the new user.
        res.writeHead(302, { 'Location': `/users/${user.id}` });
        res.end();
      }
    }
}

module.exports = UserController;
