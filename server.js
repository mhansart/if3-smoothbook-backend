const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://smoothbook-demo.netlify.app/"
  // origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World !" });
});

require("./app/routes/user.route.js")(app);
require("./app/routes/page.route.js")(app);
require("./app/routes/infos.route.js")(app);
require("./app/routes/post.route.js")(app);
require("./app/routes/pagePost.route.js")(app);
require("./app/routes/analytics.route.js")(app);
require("./app/routes/files.route.js")(app);
require("./app/controllers/login.controller.js")(app);



// set port, listen for requests
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});