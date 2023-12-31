const AWS = require("aws-sdk");
require("dotenv").config();
const path = require("path");
const {
  AWSServiceErrorCode,
  AWSServiceError,
  FileNotAllowedError,
} = require("../../typings/index");
const { allowedExtensions } = require("../../constants/index");

class AWSService {
  static s3;

  static async checkFileExtension(params) {
    const fileExtension = path.extname(params).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new FileNotAllowedError(
        "Invalid file type. Allowed types: .png, .jpeg, .jpg, .heic, .pdf, .doc"
      );
    }
  }

  static initializeService() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.s3 = new AWS.S3();
  }

  static async uploadResource(file) {
    try {
      await this.checkFileExtension(file.originalname);

      const s3 = this.getS3Instance();

      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${file.originalname}`,
        Body: file.buffer,
      };

      const s3Response = await s3.upload(params).promise();
      const externalId = s3Response.Key;
      return externalId;
    } catch (error) {
      if (error instanceof FileNotAllowedError) {
        throw error;
      } else if (Object.values(AWSServiceErrorCode).includes(error.code)) {
        console.error(`AWS Error: ${String(error.message)}`);
      } else {
        throw new AWSServiceError("AWS INTERNAL ERROR");
      }
    }
  }

  static async generateSignedUrl(key, expiration = 604800) {
    try {
      const s3 = this.getS3Instance();

      const signedUrl = await s3.getSignedUrlPromise("getObject", {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Expires: expiration,
      });

      return signedUrl;
    } catch (error) {
      if (Object.values(AWSServiceErrorCode).includes(error.code)) {
        Logger.error(`AWS Error: ${String(error.message)}`);
      }
      throw new AWSServiceError("Error generating signed URL");
    }
  }

  static getS3Instance() {
    if (!this.s3) {
      this.initializeService();
    }
    return this.s3;
  }
}

module.exports = AWSService;
