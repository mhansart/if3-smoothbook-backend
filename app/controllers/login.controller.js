

module.exports = app => {
    const bcrypt = require("bcryptjs");
    const sql = require("../config/db");

    app.post("/api/Login", (req, res) => {
        sql
          .query(`SELECT * FROM user WHERE email = ?`, [req.body.email], (err, user) => {
            if (user) {
              bcrypt
                .compare(req.body.password, user[0].password)
                .then(function (result) {
                  if (result) {
                    thisUser = {
                      name: user[0].name,
                      firstname: user[0].firstname,
                      email:user[0].email
                    };
                    res.json(thisUser);
                  }else{
                    res.status(500).json({error:'error'});
                  }
                
                });
            }
          })
      });


}
