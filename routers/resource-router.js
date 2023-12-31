const { ResourceController } = require("../controllers/index");
const { Router } = require("express");
const { FileUpload } = require("../middlewares/index");

class ResourceRouter {
  static getRoutes() {
    const router = Router();

    router.post("/", FileUpload.uploadImage, ResourceController.uploadResource);

    return router;
  }
}

module.exports = ResourceRouter;
