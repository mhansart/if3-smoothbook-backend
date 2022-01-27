module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
     // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/", user.findAll);
  
    // Retrieve a single User with id
    router.get("/:email", user.findOne);
  
    // Update user with id
    router.put("/:id", user.update);

    // Update a user psw with id
    router.put("/mdp/:id", user.updatePsw);
  
    // Delete a user with id
    router.delete("/:id", user.delete);
  
    app.use('/api/user', router);
  };