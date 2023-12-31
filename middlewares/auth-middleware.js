const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  TokenNotFoundError,
  UnauthorizedAccessError,
} = require("../typings/index");

class AuthMiddleware {
  static async ensureAccess(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new TokenNotFoundError("Authentication token not found");
      }
      const bearerToken = authorization.split(" ");
      const token = bearerToken[1];

      const jwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const accountId = jwtPayload.accountId;

      if (accountId !== req.params.accountId) {
        throw new UnauthorizedAccessError(
          "You don't have permission to access"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthMiddleware;
