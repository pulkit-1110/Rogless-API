const { ResourceService } = require("../services/index");

class ResourceController {
  static async uploadResource(req, res, next) {
    try {
      const file = req.file;
      const resource = await ResourceService.uploadResource(file);
      res.status(200).send(resource);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = ResourceController;
