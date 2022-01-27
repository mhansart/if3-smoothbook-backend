const Post = require("../models/post.model.js");

// Create and Save a new post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    // Create a Tutorial
    const post = new Post({
        title: req.body.title,
        picture: req.body.picture,
        content: req.body.content,
        date: req.body.date,
        active: req.body.active,
        views:'[]',
    });

    // Save post in the database
    Post.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {

  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send(data);
  });
};


 // Find a single post by id
exports.findOne = (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving post with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a post identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Post.updateById(
    req.params.id,
    new Post(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Post with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Update a post active identified by the id in the request
exports.updateActive = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Post.updateActiveById(
      req.params.id,
      req.body.active,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found post with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating post with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  // Update a post views identified by the id in the request
exports.updateViews = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Post.updateViewsById(
      req.params.id,
      req.body.views,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found post with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating post with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };


// Delete a post with the specified id in the request
exports.delete = (req, res) => {
  Post.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete post with id " + req.params.id
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};