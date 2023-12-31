const { AppError } = require("./common");

const AWSErrorCode = {
  AccessDenied: "AccessDenied",
  BucketNotEmpty: "BucketNotEmpty",
  EntityTooLarge: "EntityTooLarge",
  InvalidRequest: "InvalidRequest",
  NoSuchBucket: "NoSuchBucket",
  NoSuchKey: "NoSuchKey",
};

const AWSServiceErrorCode = {
  INTERNAL_SERVER_ERROR: "AWS_SERVICE_ERR_01",
  NO_SUCH_BUCKET: "AWS_SERVICE_ERR_02",
  VALIDATION_ERROR: "AWS_SERVICE_ERR_03",
  UNKNOWN_SERVICE_ERROR: "COMMUNICATION_ERR_04",
};

class AWSServiceError extends AppError {
  constructor(msg) {
    super(msg);
    this.code = AWSServiceErrorCode.INTERNAL_SERVER_ERROR;
    this.httpStatusCode = 500;
  }
}

class FileNotAllowedError extends AppError {
  constructor(message) {
    super(message);
    this.name = "FileNotAllowedError";
  }
}

module.exports = {
  FileNotAllowedError,
  AWSServiceError,
  AWSServiceErrorCode,
  AWSErrorCode,
};
