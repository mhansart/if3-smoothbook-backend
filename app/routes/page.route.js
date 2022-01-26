module.exports = app => {
    const page = require("../controllers/page.controller.js");
  
    var router = require("express").Router();
  
     // Create a new page
    router.post("/", page.create);
  
    // Retrieve all pages
    router.get("/", page.findAll);
  
    // Retrieve a single page with id
    router.get("ById/:id", page.findOne);

    // Retrieve a single page with id
    router.get("/:route", page.findByRoute);
  
    // Update page with id
    router.put("/:id", page.update);

    // Update page with id
    router.put("Active/:id", page.updateActive);

    // Update page with id
    router.put("Views/:id", page.updateViews);
  
    // Delete a Tutorial with id
    router.delete("/:id", page.delete);
  
    app.use('/api/page', router);
  };