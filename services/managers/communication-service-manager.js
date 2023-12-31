const PlivoService = require("../services/plivo-service");

class CommunicationServiceManager {
  static async mountService() {
    PlivoService.initializeService();
    return Promise.resolve();
  }
}

module.exports = CommunicationServiceManager;
