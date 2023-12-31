const { PhoneNumber } = require("./account");
const { AppError } = require("./common");

class Verification {
  constructor(status) {
    this.status = status;
  }
}

const VerificationErrorCode = {
  INVALID_OTP: "VERIFICATION_ERR_01",
};

class WrongOTPError extends AppError {
  constructor(message = "Wrong OTP") {
    super(message);
    this.name = "WrongOTPError";
    this.code = VerificationErrorCode.Wrong_OTP;
    this.httpStatusCode = 401;
  }
}

module.exports = {
  Verification,
  VerificationErrorCode,
  WrongOTPError,
};
