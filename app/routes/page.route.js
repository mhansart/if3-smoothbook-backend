module.exports = app => {
    const page = require("../controllers/page.controller.js");
  
    var router = require("express").Router();
  
     // Create a new page
    router.post("/", page.create);
  
    // Retrieve all pages
    router.get("/", page.findAll);
  
    // Retrieve a single page with id
    router.get("/byId/:id", page.findOne);

    // Retrieve a single page with route
    router.get("/:route", page.findByRoute);
  
    // Update page with id
    router.put("/:id", page.update);

    // Update page active with id
    router.put("/active/:id", page.updateActive);

    // Update page views with id
    router.put("/views/:id", page.updateViews);
  
    // Delete a page with id
    router.delete("/:id", page.delete);
  
    app.use('/api/page', router);
  };