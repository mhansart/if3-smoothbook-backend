
var express = require("express");
var mysql = require("mysql");
require('dotenv').config();

var multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
const storageFav = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `favicon.ico`);
  },
});
const storageLogo = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `logo-menu-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const uploadFav = multer({ storage: storageFav });
const uploadLogo = multer({ storage: storageLogo });

const bcrypt = require("bcryptjs");

var app = express();


app.use("/uploads", express.static("uploads"));

let bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/files", upload.array("files"), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send({ sttus: "ok" });
});
app.post("/api/favicon", uploadFav.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
app.post("/api/logo", uploadLogo.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit : 20,
});

pool.getConnection((err,connexion)=> {
  if(err) throw err;

    //  USER
  app.get("/api/user", (req, res) => {
    connexion.query(`SELECT * FROM user`,(err, user) => {
      connexion.release();
      res.json(user);
    });
  });

  app.get("/api/user/:email", (req, res) => {
    connexion
      .query(`SELECT * FROM user WHERE email = ?`, req.params.email, (err, user) => {
        connexion.release();
        res.json(user);
      });
  });

  app.post("/api/Login", (req, res) => {
    connexion
      .query(`SELECT * FROM user WHERE email = ?`, [req.body.email], (err, user) => {
        if (user) {
          bcrypt
            .compare(req.body.password, user[0].password)
            .then(function (result) {
              if (result) {
                thisUser = {
                  name: user[0].name,
                  firstname: user[0].firstname,
                  email:user[0].email
                };
                res.json(thisUser);
              }else{
                res.status(500).json({error:'error'});
              }
              connexion.release();
            });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  app.put("/api/user/:id", (req,res)=>{
    connexion
      .query("UPDATE user SET ? WHERE id = ?", [{
        name:req.body.name,
        firstname:req.body.firstname,
        email:req.body.email
      },
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  })

  app.put("/api/userMdp/:id", (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(function (result) {
      connexion
      .query("UPDATE user SET password = ? WHERE id = ?", [
        result,
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    })
  })

  app.post("/api/user", (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(function (result) {
      connexion
      .query("INSERT INTO user SET ?", [{
        name:req.body.name,
        firstname:req.body.firstname,
        email:req.body.email,
        password:result,
        admin:req.body.admin,
      }
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    })
  })

  app.delete("/api/user/:id", (req, res) => {
    connexion
      .query(`DELETE FROM user WHERE id = ?`, req.params.id, (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  // PAGE
  app.get("/api/page", (req, res) => {
    connexion.query(`SELECT * FROM page`, (err, page) => {
      connexion.release();
      res.json(page);
    });
  });

  app.get("/api/page/:route", (req, res) => {
    new Promise((resolve, reject) => {
      connexion
        .query(`SELECT * FROM page WHERE route = ?`, req.params.route, (err, page) => {
          if(page[0] == undefined){
            resolve(page);
          }
            connexion
              .query(
                `SELECT * from page_post INNER JOIN posts ON page_post.post_id = posts.id WHERE page_post.page_id = ?`,
                [page[0].id], (err, result) => {
                page[0].posts = result;
                resolve(page);
              })
              .catch((error) => {
                reject(error);
              });
        })
        .catch((errorQuery) => {
          console.log(errorQuery);
        });
    })
      .then((listUserAll) => {
        connexion.release();
        res.json(listUserAll);
      })
      .catch((error) => {
        connexion.release();
        res.json({ error: "Erreur de promesse" });
      });
  });

  app.get("/api/pageById/:id", (req, res) => {
    connexion
      .query(`SELECT * FROM page WHERE id = ?`, req.params.id, (err, page) => {
        connexion.release();
        res.json(page);
      });
  });

  app.delete("/api/page/:id", (req, res) => {
    connexion
      .query(`DELETE FROM page WHERE id = ?`, req.params.id, (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  app.post("/api/page", (req, res) => {
    connexion
      .query(`INSERT INTO page SET ?`, {
        name: req.body.name,
        type: req.body.type,
        route: req.body.route,
        content: req.body.content,
        active: req.body.active,
        views:'[]',
      }, (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  app.put("/api/pageActive/:id", (req, res) => {
    connexion
      .query("UPDATE page SET active = ? WHERE id = ?", [
        req.body.active,
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });

  app.put("/api/page/:id", (req, res) => {
    connexion
      .query("UPDATE page SET ? WHERE id = ?", [
        {
          name: req.body.name,
          type: req.body.type,
          route: req.body.route,
          content: req.body.content,
          active: req.body.active,
        },
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });

  app.put("/api/pageViews/:id", (req, res) => {
    connexion
      .query("UPDATE page SET views = ? WHERE id = ?", [
        req.body.views,
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });

  // Infos
  app.get("/api/infos", (req, res) => {
    connexion.query(`SELECT * FROM infos`, (err, infos) => {
      connexion.release();
      res.json(infos);
    });
  });

  app.put("/api/infos/:infos_name", (req, res) => {
    connexion
      .query("UPDATE infos SET ? WHERE infos_name = ?", [
        {
          infos_value: req.body.infos_value,
        },
        req.params.infos_name,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  
  // POST
  app.get("/api/post", (req, res) => {
    connexion.query(`SELECT * FROM posts`, (err, post) => {
      connexion.release();
      res.json(post);
    });
  });
  app.get("/api/post/:id", (req, res) => {
    connexion.query(`SELECT * FROM posts WHERE id = ?`, [req.params.id], (err, post) => {
      connexion.release();
      res.json(post);
    });
  });
  app.post("/api/post", (req, res) => {
    connexion
      .query(`INSERT INTO posts SET ?`, {
        title: req.body.title,
        picture: req.body.picture,
        content: req.body.content,
        date: req.body.date,
        active: req.body.active,
        views:'[]',
        
      }, (err, infos) => {
        connexion.release();
        res.status(200).json(infos.insertId);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });

  app.put("/api/post/:id", (req, res) => {
    connexion
      .query(`UPDATE posts SET ? WHERE id=?`, [{
        title: req.body.title,
        picture: req.body.picture,
        content: req.body.content,
        date: req.body.date,
        active: req.body.active,
      },req.params.id], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  app.delete("/api/post/:id", (req, res) => {
    connexion
      .query(`DELETE FROM posts WHERE id = ?`, req.params.id, (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  app.put("/api/postActive/:id", (req, res) => {
    connexion
      .query("UPDATE posts SET active = ? WHERE id = ?", [
        req.body.active,
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  app.post("/api/post_page", (req, res) => {
    connexion
      .query(`INSERT INTO page_post SET ?`, {
        page_id: req.body.page_id,
        post_id: req.body.post_id,
      }, (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  app.get("/api/post_page/:id", (req, res) => {
    connexion
      .query(`SELECT * FROM page_post WHERE post_id = ?`, [req.params.id], (err, post) => {
        connexion.release();
        res.json(post);
      });
  });
  app.delete("/api/post_page/:id", (req, res) => {
    connexion
      .query(`DELETE FROM page_post WHERE post_id = ?`, [req.params.id], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  app.put("/api/postViews/:id", (req, res) => {
    connexion
      .query("UPDATE posts SET views = ? WHERE id = ?", [
        req.body.views,
        req.params.id,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });

  //  ANALYTICS
  app.get("/api/analytics", (req, res) => {
    connexion.query(`SELECT * FROM analytics`, (err, data) => {
      connexion.release();
      res.json(data);
    });
  });
  app.post("/api/views", (req, res) => {
    connexion
      .query(`INSERT INTO analytics SET ?`, {
        month:req.body.month,
        year:req.body.year,
        views:req.body.views,
        views_month: req.body.views_month,
      }, (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
  app.put("/api/views/:month", (req, res) => {
    connexion
      .query("UPDATE analytics SET ? WHERE month = ?", [{
        month:req.body.month,
        views:req.body.views,
        views_month: req.body.views_month,
      },
        req.params.month,
      ], (err, infos) => {
        connexion.release();
        res.status(200).json(infos);
      })
      .catch((error) => {
        connexion.release();
        res.status(500).json(error);
      });
  });
});

app.listen(port, () => {
  console.log(`le serveur écoute sur le port ${port}`);
});
