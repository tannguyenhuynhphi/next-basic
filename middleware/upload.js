const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/next-app",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photo",
      filename: `${Date.now()}-bezkoder-${file.originalname}`,
    };
  },
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
