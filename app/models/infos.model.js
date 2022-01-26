const sql = require("../config/db");

const Infos = function(infos) {
    this.id= infos.id;
    this.infos_name= infos.infos_name
    this.infos_value= infos.infos_value;
  };
  
  Infos.getAll = (result) => {
    let query = "SELECT * FROM infos";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  Infos.updateByName = (name, value, result) => {
    sql.query(
      "UPDATE infos SET ? WHERE infos_name = ?",
      [ {
        infos_value: value,
      },
      name,
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
        result(null, res);
      }
    );
  };
    
  module.exports = Infos;