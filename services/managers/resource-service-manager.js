const AWSService = require("../services/aws-service");

class ResourceServiceManager {
  static async mountService() {
    AWSService.initializeService();
    return Promise.resolve();
  }
}

module.exports = ResourceServiceManager;
