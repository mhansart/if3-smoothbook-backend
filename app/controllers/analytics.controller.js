const Analytics = require("../models/analytics.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
      // Create analytics
      const analytics = new Analytics({
        month:req.body.month,
        year:req.body.year,
        views:req.body.views,
        views_month: req.body.views_month,
      });
  
      // Save analytics in the database
      Analytics.create(analytics, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the analytics."
          });
        else res.send(data);
      });
  };


// Retrieve all Analytics from the database.
exports.findAll = (req, res) => {

  Analytics.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving analytics."
      });
    else res.send(data);
  });
};




// Update a analytics identified by the month in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Analytics.updateByMonth(
    req.params.month,
    new Analytics(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found analytics with month ${req.params.month}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating analytics with month " + req.params.month
          });
        }
      } else res.send(data);
    }
  );
};

