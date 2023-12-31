const { AppError } = require("./common");

const UnauthorizedAccessError = class UnauthorizedAccessError extends AppError {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedAccessError";
  }
};

const TokenNotFoundError = class TokenNotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.name = "TokenNotFoundError";
  }
};

const AccountDoesNotExistError = class AccountDoesNotExistError extends AppError {
  constructor(message) {
    super(message);
    this.name = "AccountDoesNotExistError";
  }
};

const InvalidOTPError = class InvalidOTPError extends AppError {
  constructor(message) {
    super(message);
    this.name = "InvalidOTPError";
  }
};

module.exports = {
  PhoneNumber: {
    countryCode: String,
    phoneNumber: String,
  },
  JwtPayload: {
    accountId: String,
  },
  UnauthorizedAccessError,
  TokenNotFoundError,
  AccountDoesNotExistError,
  InvalidOTPError,
};
