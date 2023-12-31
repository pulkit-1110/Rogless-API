const {
  AccountDoesNotExistError,
  InvalidOTPError,
} = require("../../typings/index");
const AWSService = require("./aws-service");
const {
  AccountRepository,
  ResourceRepository,
} = require("../../repositories/index");
const AccessTokenService = require("./access-token-service");
const ResourceService = require("./resource-service");
const PlivoService = require("./plivo-service");

class AccountService {
  static async generateOtp(params) {
    await PlivoService.sendOTP({
      recipientPhone: params.countryCode + params.phoneNumber,
    });

    const existingAccount = await AccountRepository.accountDb.findOne({
      phoneNumber: params,
    });

    if (!existingAccount) {
      await AccountRepository.accountDb.create({
        phoneNumber: params,
      });
    }
  }

  static async verifyOtp(params) {
    const account = await AccountService.getAccountByPhoneNumber(
      params.phoneNumber
    );
    const status = await PlivoService.verifyOTP({
      recipientPhone:
        params.phoneNumber.countryCode + params.phoneNumber.phoneNumber,
      verificationCode: params.verificationCode,
    });
    if (status === "session validated successfully.") {
      await AccountRepository.accountDb.updateOne(
        {
          _id: account.id,
        },
        { verified: true, verifiedAt: new Date() }
      );
    } else {
      throw new InvalidOTPError(status);
    }
    return AccessTokenService.createAccessToken({ accountId: account.id });
  }

  static async getAccountByPhoneNumber(phoneNumber) {
    const accountDb = await AccountRepository.accountDb.findOne({
      phoneNumber,
    });
    return AccountService.serialize(accountDb);
  }

  static async showDetails(accountId) {
    const accountDb = await AccountRepository.accountDb.findOne({
      _id: accountId,
    });
    if (!accountDb) {
      throw new AccountDoesNotExistError("Account does not exist");
    }
    return AccountService.serialize(accountDb);
  }

  static async updateAccountDetails(params) {
    const updatedAccount = await AccountRepository.accountDb.findOneAndUpdate(
      { _id: params.accountId },
      params,
      { new: true }
    );
    return AccountService.serialize(updatedAccount);
  }

  static async serialize(accountDb) {
    const resourceId = accountDb.profileImage;
    let image;

    if (resourceId) {
      const resource = await ResourceRepository.resourceDb.findOne({
        _id: resourceId,
      });
      const signedUrl = await AWSService.generateSignedUrl(resource.externalId);
      image = ResourceService.serialize(resourceId.toString(), signedUrl);
    }

    return {
      id: accountDb._id.toString(),
      fullName: accountDb.fullName,
      phoneNumber: accountDb.phoneNumber,
      address: accountDb.address,
      profileImage: image,
      age: accountDb.age,
      bloodGroup: accountDb.bloodGroup,
      height: accountDb.height,
      weight: accountDb.weight,
    };
  }
}

module.exports = AccountService;
