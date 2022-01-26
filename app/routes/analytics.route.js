module.exports = app => {
    const analytics = require("../controllers/analytics.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", analytics.create);

    // Retrieve all infos
    router.get("/", analytics.findAll);
  
    // Update infos with id
    router.put("/:month", analytics.update);
  
    app.use('/api/analytics', router);
  };