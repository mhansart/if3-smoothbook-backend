const sql = require("../config/db");

const Post = function(post) {
    this.id= post.id;
    this.title= post.title;
    this.content=post.content;
    this.picture= post.picture;
    this.date= post.date;
    this.active= post.active;
    this.views=post.views;
  };

  Post.create = (post, result) => {
    sql.query("INSERT INTO posts SET ?", page, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...post });
    });
  };
  
  Post.findById = (id, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ?`, id, (err, res) => {
        
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
  
  Post.getAll = (result) => {
    let query = "SELECT * FROM posts";
  
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  Post.updateActiveById = (id, active, result) => {
    sql.query(
      "UPDATE posts SET active = ? WHERE id = ?",
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

  Post.updateViewsById = (id, views, result) => {
    sql.query(
      "UPDATE posts SET views = ? WHERE id = ?",
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

  Post.updateById = (id, post, result) => {
    sql.query(
      "UPDATE posts SET ? WHERE id = ?",
      [{
        title: post.title,
        picture: post.picture,
        content: post.content,
        date: post.date,
        active: post.active,
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
        result(null, { id: id, ...post });
      }
    );
  };
  
  Post.remove = (id, result) => {
    sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
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
    
  module.exports = Post;