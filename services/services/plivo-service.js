const {
  verificationCheckUrl,
  verificationUrl,
} = require("../../constants/index");
const {
  PlivoErrorCode,
  ThirdPartyServiceError,
} = require("../../typings/index");
const axios = require("axios");
require("dotenv").config();

class PlivoService {
  static auth = null;
  static appUuid;
  static verifyUrl;
  static checkVerificationUrl;
  static isTestingMode;
  static id;
  static testOTP;

  // Temporary array to store phone number and session ID mapping
  static activeSessions = {};

  static initializeService() {
    const PLIVO_AUTH_ID = process.env.PLIVO_VERIFY_AUTHID;
    const PLIVO_AUTH_TOKEN = process.env.PLIVO_VERIFY_AUTHTOKEN;
    this.appUuid = process.env.PLIVO_VERIFY_APPUUID;
    this.verifyUrl = verificationUrl.replace("{auth_id}", PLIVO_AUTH_ID);
    this.checkVerificationUrl = verificationCheckUrl.replace(
      "{auth_id}",
      PLIVO_AUTH_ID
    );
    this.auth = { username: PLIVO_AUTH_ID, password: PLIVO_AUTH_TOKEN };
    this.testOTP = process.env.PLIVO_TEST_OTP;
  }

  static storeActiveSession(phoneNumber, sessionUuid) {
    this.activeSessions[phoneNumber] = sessionUuid;
  }

  static deleteActiveSession(phoneNumber) {
    delete this.activeSessions[phoneNumber];
  }

  static async sendPlivoRequest(url, data) {
    let response;
    try {
      response = await axios.post(url, data, { auth: this.auth });
      this.id = response.data.session_uuid;

      // Store the active session for the phone number
      this.storeActiveSession(data.recipient, this.id);
    } catch (error) {
      if (Object.values(PlivoErrorCode).includes(error.code)) {
        console.error(`Plivo Error: ${String(error.message)}`);
      }
      throw new ThirdPartyServiceError("SMS service unavailable.");
    }
  }

  static async sendPlivoVerifyRequest(url, data) {
    let response;
    try {
      response = await axios.post(url, data, { auth: this.auth });
    } catch (error) {
      if (Object.values(PlivoErrorCode).includes(error.code)) {
        console.error(`Plivo Error: ${String(error.message)}`);
      }
      console.log("Error: " + error.message, error.code);
      return "OTP expired or invalid.";
    }
    return response.data.message;
  }

  static async sendOTP(params) {
    const data = {
      app_uuid: this.appUuid,
      recipient: params.recipientPhone,
      Channel: "sms",
    };
    this.isTestingMode = JSON.parse(process.env.PLIVO_TEST_MODE);
    if (!this.isTestingMode) {
      await this.sendPlivoRequest(this.verifyUrl, data);
    }
  }

  static async verifyOTP(params) {
    this.isTestingMode = JSON.parse(process.env.PLIVO_TEST_MODE);
    if (!this.isTestingMode) {
      const phoneNumber = params.recipientPhone;
      const session_uuid = this.activeSessions[phoneNumber];
      if (!session_uuid) {
        return "Session not found. Please request a new OTP.";
      }
      const data = {
        otp: params.verificationCode,
      };
      this.checkVerificationUrl = this.checkVerificationUrl.replace(
        "{session_uuid}",
        session_uuid
      );
      const verificationResult = await this.sendPlivoVerifyRequest(
        this.checkVerificationUrl,
        data
      );

      // Delete the active session after verification
      if (verificationResult === "session validated successfully.") {
        this.deleteActiveSession(phoneNumber);
        this.checkVerificationUrl = this.checkVerificationUrl.replace(
          session_uuid,
          "{session_uuid}"
        );
      }
      return verificationResult;
    }
    if (params.verificationCode === this.testOTP) {
      return "session validated successfully.";
    }

    return "OTP expired or invalid.";
  }
}

module.exports = PlivoService;
