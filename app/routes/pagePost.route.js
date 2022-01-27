module.exports = app => {
    const pagePost = require("../controllers/pagePost.controller.js");
  
    var router = require("express").Router();
  
     // Create a new pagepost
    router.post("/", pagePost.create);
  
    // Retrieve a single pagepost with post_id
    router.get("/:id", pagePost.findOne);
  
    // Delete a pagepost with id
    router.delete("/:id", pagePost.delete);
  
    app.use('/api/post_page', router);
  };