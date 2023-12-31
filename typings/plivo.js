const { AppError } = require("./common");

const PlivoErrorCode = {
  InvalidAuthId: 401,
  AccountBalanceExhausted: 402,
  AccountSuspended: 403,
};

const CommunicationErrorCode = {
  VALIDATION_ERROR: "COMMUNICATION_ERR_01",
  THIRD_PARTY_ERROR: "COMMUNICATION_ERR_02",
  SERVER_ERROR: "COMMUNICATION_ERR_03",
  UNKNOWN_SERVICE_ERROR: "COMMUNICATION_ERR_04",
};
class ThirdPartyServiceError extends AppError {
  constructor(msg) {
    super(msg);
    this.code = CommunicationErrorCode.THIRD_PARTY_ERROR;
    this.httpStatusCode = 405;
  }
}

module.exports = {
  PlivoErrorCode,
  CommunicationErrorCode,
  ThirdPartyServiceError,
};
