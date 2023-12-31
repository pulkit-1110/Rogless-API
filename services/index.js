const AccountService = require("./services/account-service");
const CommunicationServiceManager = require("./managers/communication-service-manager");
const ResourceServiceManager = require("./managers/resource-service-manager");
const ResourceService = require("./services/resource-service");
const AWSService = require("./services/aws-service");

module.exports = {
  AccountService,
  CommunicationServiceManager,
  ResourceService,
  ResourceServiceManager,
  AWSService,
};
