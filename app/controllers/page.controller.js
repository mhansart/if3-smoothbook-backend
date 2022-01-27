const Page = require("../models/page.model.js");

// Create and Save a new page
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    // Create a page
    const page = new Page({
        name: req.body.name,
        type: req.body.type,
        route: req.body.route,
        content: req.body.content,
        active: req.body.active,
        views:'[]',
    });

    // Save page in the database
    Page.create(page, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the page."
        });
      else res.send(data);
    });
};

// Retrieve all pages from the database.
exports.findAll = (req, res) => {

  Page.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pages."
      });
    else res.send(data);
  });
};


 // Find a single page by id
exports.findOne = (req, res) => {
  Page.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found page with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving page with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

 // Find a single page by route
 exports.findByRoute = (req, res) => {
  Page.findContent(req.params.route, (err, data) => {
    new Promise((resolve, reject) => {
      if(err) reject(err);
      if(data[0].type === "page") resolve(data);
      Page.getPost(data[0].id, (err, posts) =>{
        if(err) reject(err);
        data[0].posts = posts;
        resolve(data);
      });
    }).then((data) => {
      res.json(data);
    }).catch((error) => {
      res.send({ error: "Promise error" });
    });
  });
};




// Update a Page identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Page.updateById(
    req.params.id,
    new Page(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Page with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Page with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Update a page active identified by the id in the request
exports.updateActive = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Page.updateActiveById(
      req.params.id,
      req.body.active,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found page with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating page with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  // Update a page views identified by the id in the request
exports.updateViews = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Page.updateViewsById(
      req.params.id,
      req.body.views,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found page with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating page with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };


// Delete a page with the specified id in the request
exports.delete = (req, res) => {
  Page.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Page with id " + req.params.id
        });
      }
    } else res.send({ message: `Page was deleted successfully!` });
  });
};