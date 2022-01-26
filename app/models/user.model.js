const sql = require("../config/db");

const User = function(user) {
    this.id= user.id;
    this.name= user.name
    this.firstname= user.firstname;
    this.email= user.email;
    this.password= user.password;
    this.admin=user.admin;
  };

  User.create = (user, result) => {
    sql.query("INSERT INTO user SET ?", user, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...user });
    });
  };
  
  User.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM user WHERE email = ?`, email, (err, res) => {
        
      if (err) {
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.getAll = (result) => {
    let query = "SELECT * FROM user";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };
  
  User.updatePswById = (id, psw, result) => {
    sql.query(
      "UPDATE user SET password = ? WHERE id = ?",
      [ psw, id ],
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, res);
      }
    );
  };

  User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE user SET ? WHERE id = ?",
      [{
        name:user.name,
        firstname:user.firstname,
        email:user.email
      },
        id,
      ],
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, { id: id, ...user });
      }
    );
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  };
    
  module.exports = User;