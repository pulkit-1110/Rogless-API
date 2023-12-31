const jsonwebtoken = require("jsonwebtoken");
const { AccessToken } = require("../../typings/index");
require("dotenv").config();

class AccessTokenService {
  static createAccessToken(params) {
    const jwtSigningKey = process.env.JWT_SECRET_KEY;
    const jwtToken = jsonwebtoken.sign(
      { accountId: params.accountId },
      jwtSigningKey,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    const accessToken = new AccessToken();
    accessToken.accountId = params.accountId;
    accessToken.token = jwtToken;

    const verifiedToken = jsonwebtoken.verify(jwtToken, jwtSigningKey);
    accessToken.expiresAt = new Date(verifiedToken.exp * 1000);

    return accessToken;
  }
}

module.exports = AccessTokenService;
