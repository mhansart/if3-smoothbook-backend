const sql = require("../config/db");

const PagePost = function(pagePost) {
    this.id = pagePost.id;
    this.page_id = pagePost.page_id;
    this.post_id = pagePost.post_id;
  };

  PagePost.create = (pagePost, result) => {
    sql.query("INSERT INTO page_post SET ?", pagePost, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...pagePost });
    });
  };
  
  PagePost.findById = (id, result) => {
    sql.query(`SELECT * FROM page_post WHERE post_id = ?`, id, (err, res) => {
        
      if (err) {
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found pagepost with the id
      result({ kind: "not_found" }, null);
    });
  };
  

  PagePost.remove = (id, result) => {
    sql.query("DELETE FROM page_post WHERE post_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found pagepost with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  };
    
  module.exports = PagePost;