const PagePost = require("../models/pagePost.model.js");

// Create and Save a new PagePost
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    // Create a PagePost
    const pagePost = new PagePost({
        page_id: req.body.page_id,
        post_id: req.body.post_id,
    });

    // Save pagePost in the database
    PagePost.create(page, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the pagePost."
        });
      else res.send(data);
    });
};


 // Find a single pagePost by post_id
exports.findOne = (req, res) => {
  PagePost.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post_id with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving post_id with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a pagePost with the specified id in the request
exports.delete = (req, res) => {
  PagePost.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PagePost with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete PagePost with id " + req.params.id
        });
      }
    } else res.send({ message: `PagePost was deleted successfully!` });
  });
};