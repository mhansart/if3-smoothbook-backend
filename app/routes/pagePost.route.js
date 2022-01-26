module.exports = app => {
    const pagePost = require("../controllers/pagePost.controller.js");
  
    var router = require("express").Router();
  
     // Create a new post
    router.post("/", pagePost.create);
  
    // Retrieve a single post with id
    router.get("/:id", pagePost.findOne);
  
    // Delete a Tutorial with id
    router.delete("/:id", pagePost.delete);
  
    app.use('/api/post_page', router);
  };