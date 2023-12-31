const { AppError } = require("./common");

class FileUploadError extends AppError {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  CreateResourceParams: {
    externalId: String,
  },
  FileUploadError,
};
