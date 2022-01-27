const Infos = require("../models/infos.model.js");



// Retrieve all infos from the databas.
exports.findAll = (req, res) => {

  Infos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving infos."
      });
    else res.send(data);
  });
};




// Update an info identified by the name in the request
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
            message: `Not found info with name ${req.params.infos_name}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating info with name " + req.params.infos_name
          });
        }
      } else res.send(data);
    }
  );
};

