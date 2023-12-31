const AccountRepository = require("./account-repository");
const ResourceRepository = require("./resource-repository");

module.exports = {
  AccountRepository,
  AccountDB: require("./account-repository").AccountDB,
  ResourceRepository,
  ResourceDB: require("./resource-repository").ResourceDB,
};
