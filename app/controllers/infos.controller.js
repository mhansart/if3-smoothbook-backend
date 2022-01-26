const Infos = require("../models/infos.model.js");



// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {

  Infos.getAll((err, data) => {
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

  Infos.updateByName(
    req.params.infos_name,
    req.body.infos_value,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.infos_value}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.infos_value
          });
        }
      } else res.send(data);
    }
  );
};

