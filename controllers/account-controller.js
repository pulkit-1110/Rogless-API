const { AccountService } = require("../services/index");
const { ParamsFilter } = require("../helpers/index");

class AccountController {
  static async generateOtp(req, res, next) {
    try {
      const { countryCode, phoneNumber } = req.body;
      await AccountService.generateOtp({ countryCode, phoneNumber });
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  static async verifyOTP(req, res, next) {
    try {
      const { phoneNumber, verificationCode } = req.body;

      const accessToken = await AccountService.verifyOtp({
        phoneNumber,
        verificationCode,
      });

      res.status(200).send(accessToken);
    } catch (e) {
      next(e);
    }
  }

  static async getAccountDetails(req, res, next) {
    try {
      const { accountId } = req.params;
      const account = await AccountService.showDetails(accountId);
      res.status(200).send(account);
    } catch (e) {
      next(e);
    }
  }

  static async updateAccount(req, res, next) {
    try {
      const { accountId } = req.params;
      const {
        fullName,
        address,
        profileImage,
        age,
        bloodGroup,
        height,
        weight,
      } = req.body;

      const updateParams = ParamsFilter.filterEmptyParams({
        accountId,
        fullName,
        address,
        profileImage,
        age,
        bloodGroup,
        height,
        weight,
      });

      const updatedAccount = await AccountService.updateAccountDetails(
        updateParams
      );
      res.status(200).send(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AccountController;
