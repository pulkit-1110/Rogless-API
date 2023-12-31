const { PhoneNumber, Address } = require("../typings/index");
const { Resource } = require("./resource");

const Account = {
  id: String,
  fullName: String,
  phoneNumber: PhoneNumber,
  address: Address,
  profileImage: Resource,
  age: Number,
  bloodGroup: String,
  height: String,
  weight: Number,
};

module.exports = Account;
