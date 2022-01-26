const sql = require("../config/db");

const Page = function(page) {
    this.id= page.id;
    this.name= page.name;
    this.type=page.type
    this.route= page.route;
    this.content= page.content;
    this.active= page.active;
    this.views=page.views;
  };

  Page.create = (page, result) => {
    sql.query("INSERT INTO page SET ?", page, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...page });
    });
  };
  
  Page.findById = (id, result) => {
    sql.query(`SELECT * FROM page WHERE id = ?`, id, (err, res) => {
        
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

  Page.findContent = (route, result) => {
    
    sql.query(`SELECT * FROM page WHERE route = ?`, route, (err, res) => { 
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

  Page.getPost = (id, result) => {
    sql.query(`SELECT * from page_post INNER JOIN posts ON page_post.post_id = posts.id WHERE page_post.page_id = ?`, id, (err, res) => {
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
  
  Page.getAll = (result) => {
    let query = "SELECT * FROM page";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  Page.updateActiveById = (id, active, result) => {
    sql.query(
      "UPDATE page SET active = ? WHERE id = ?",
      [ active, id ],
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

  Page.updateViewsById = (id, views, result) => {
    sql.query(
      "UPDATE page SET views = ? WHERE id = ?",
      [ views, id ],
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

  Page.updateById = (id, page, result) => {
    sql.query(
      "UPDATE page SET ? WHERE id = ?",
      [{
        name: page.name,
        type: page.type,
        route: page.route,
        content: page.content,
        active: page.active,
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
        result(null, { id: id, ...page });
      }
    );
  };
  
  Page.remove = (id, result) => {
    sql.query("DELETE FROM page WHERE id = ?", id, (err, res) => {
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
    
  module.exports = Page;