module.exports = app => {
    const post = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
     // Create a new post
    router.post("/", post.create);
  
    // Retrieve all posts
    router.get("/", post.findAll);
  
    // Retrieve a single post with id
    router.get("/:id", post.findOne);
  
    // Update post with id
    router.put("/:id", post.update);

    // Update post with id
    router.put("/active/:id", post.updateActive);

    // Update post with id
    router.put("/views/:id", post.updateViews);
  
    // Delete a Tutorial with id
    router.delete("/:id", post.delete);
  
    app.use('/api/post', router);
  };