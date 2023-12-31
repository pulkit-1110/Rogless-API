const { Request, Response, NextFunction } = require("express");
const multer = require("multer");
const { FileUploadError } = require("../typings/index");

const storage = multer.memoryStorage();
const upload = multer({ storage });

class FileUpload {
  static uploadImage(req, res, next) {
    upload.single(req.body.file)(req, res, (err) => {
      if (err) {
        throw new FileUploadError("File upload failed");
      }
      next();
    });
  }
}

module.exports = FileUpload;
