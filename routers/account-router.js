const { AccountController } = require("../controllers/index");
const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares/index");

class AccountRouter {
  static getRoutes() {
    const router = Router();

    router.post("/auth/otp", AccountController.generateOtp);

    router.post("/auth/verify", AccountController.verifyOTP);

    router.get(
      "/accounts/:accountId",
      AuthMiddleware.ensureAccess,
      AccountController.getAccountDetails
    );

    router.patch(
      "/accounts/:accountId",
      AuthMiddleware.ensureAccess,
      AccountController.updateAccount
    );

    return router;
  }
}

module.exports = AccountRouter;
