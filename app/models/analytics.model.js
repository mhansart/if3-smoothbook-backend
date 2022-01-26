const sql = require("../config/db");

const Analytics = function(analytics) {
    this.id= analytics.id;
    this.month = analytics.month;
    this.year = analytics.year;
    this.views = analytics.views;
    this.views_month = analytics.views_month;
  };

  Analytics.create = (analytics, result) => {
    sql.query("INSERT INTO analytics SET ?", analytics, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...analytics });
    });
  };
  
  
 Analytics.getAll = (result) => {
    let query = "SELECT * FROM analytics";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  Analytics.updateByMonth = (month, analytics, result) => {
    sql.query(
      "UPDATE analytics SET ? WHERE month = ?",
      [ {
        month:analytics.month,
        views:analytics.views,
        views_month: analytics.views_month,
      },
      month,
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
    
  module.exports = Analytics;