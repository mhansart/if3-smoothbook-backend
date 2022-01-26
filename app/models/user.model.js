const sql = require("../config/db");

const User = function(user) {
    this.id= user.id;
    this.name= user.name
    this.firstname= user.firstname;
    this.email= user.email;
    this.password= user.password;
    this.admin=user.admin;
  };

//   Tutorial.create = (newTutorial, result) => {
//     sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }
  
//       console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
//       result(null, { id: res.insertId, ...newTutorial });
//     });
//   };
  
  User.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM user WHERE email = ?`, email, (err, res) => {
        
      if (err) {
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
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
  
//   Tutorial.getAllPublished = result => {
//     sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log("tutorials: ", res);
//       result(null, res);
//     });
//   };
  
//   Tutorial.updateById = (id, tutorial, result) => {
//     sql.query(
//       "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//       [tutorial.title, tutorial.description, tutorial.published, id],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
  
//         if (res.affectedRows == 0) {
//           // not found Tutorial with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }
  
//         console.log("updated tutorial: ", { id: id, ...tutorial });
//         result(null, { id: id, ...tutorial });
//       }
//     );
//   };
  
//   Tutorial.remove = (id, result) => {
//     sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
  
//       console.log("deleted tutorial with id: ", id);
//       result(null, res);
//     });
//   };
  
//   Tutorial.removeAll = result => {
//     sql.query("DELETE FROM tutorials", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log(`deleted ${res.affectedRows} tutorials`);
//       result(null, res);
//     });
//   };
  
  module.exports = User;