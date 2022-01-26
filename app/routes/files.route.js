module.exports = app => {

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
}