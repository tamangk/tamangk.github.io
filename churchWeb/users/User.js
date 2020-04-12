
class User {

    constructor(description) {
        // if description is null or undefined, we want to create an "empty" User object.
        if (description) {
            this.lname = description.lname;
            this.fname = description.fname;
            this.email = description.email;
            this.status = description.status;
        }
        this.errors = [];
    }

    isValid() {
        this.errors = [];

        if (!this.lname || this.lname.length <= 2) {
            this.errors.push("The last name must contain at least three characters");
        }
        if (!this.fname || this.fname.length < 2) {
            this.errors.push("The first name must contain at least one character.");
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
          this.errors.push("Email is invalid");
        }
        return this.errors.length <= 0;
    }


    // In a "real" app, the methods below would be DB accesses, not just a references to a static array.

    static all() {
        return this.allUsers;
    }

    static find(id) {
        return this.allUsers.find((item) => item.id == id);
    }

    static create(userDescription) {
          let newUser = new User(userDescription);
          if (newUser.isValid()) {
              newUser.id = ++User.idCount;
              this.allUsers.push(newUser);
          }
          return newUser;
      }
  }

User.idCount = 0;
User.allUsers = []

  User.create({ fname: 'GS', lname: 'Tamang', email: 'gs@tamang.com', status: 'Pastor' });
  User.create({ fname: 'Jaya', lname: 'Sarki', email: 'jaya@sarki.com', status: 'Elder' });
  User.create({ fname: 'Khadka', lname: 'Gurung', email: 'khadka@gurung.com', status: 'Deacon' });
  User.create({ fname: 'Pema', lname: 'Tamang', email: 'pema@Tamang.com', status: 'Deacon' });
  User.create({ fname: 'Karma', lname: 'Tamang', email: 'karma@tamang.com', status: 'Treasurer' });
  User.create({ fname: 'Lashang', lname: 'Tamang', email: 'lashang@tamang.com', status: 'Worship Leader' });
  User.create({ fname: 'Dilip', lname: 'Gurung', email: 'dilip@gurung.com', status: 'Youth Leader' });
  User.create({ fname: 'Lalita', lname: 'Mongar', email: 'lalita@mongar.com', status: 'Sunday School Teacher' });
//   User.create({ fname: 'Falna', lname: 'thar', email: 'falna@thar.com', status: 'Secretary' })

console.log(User.allUsers);
module.exports = User;
