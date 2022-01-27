module.exports = app => {
    const analytics = require("../controllers/analytics.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", analytics.create);

    // Retrieve all analytics
    router.get("/", analytics.findAll);
  
    // Update analytics with month
    router.put("/:month", analytics.update);
  
    app.use('/api/analytics', router);
  };