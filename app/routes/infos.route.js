module.exports = app => {
    const infos = require("../controllers/infos.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all infos
    router.get("/", infos.findAll);
  
    // Update infos with id
    router.put("/:infos_name", infos.update);
  
    app.use('/api/infos', router);
  };