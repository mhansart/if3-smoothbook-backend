const Analytics = require("../models/analytics.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
      // Create a Tutorial
      const analytics = new Analytics({
        month:req.body.month,
        year:req.body.year,
        views:req.body.views,
        views_month: req.body.views_month,
      });
  
      // Save user in the database
      Analytics.create(analytics, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        else res.send(data);
      });
  };


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {

  Analytics.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};




// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Infos.updateByMonth(
    req.params.month,
    new Analytics(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.month}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.month
          });
        }
      } else res.send(data);
    }
  );
};

