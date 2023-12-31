const verificationUrl =
  "https://api.plivo.com/v1/Account/{auth_id}/Verify/Session/";
const verificationCheckUrl =
  "https://api.plivo.com/v1/Account/{auth_id}/Verify/Session/{session_uuid}/";

const allowedExtensions = [".png", ".jpeg", ".jpg", ".heic", ".pdf", ".doc"];

module.exports = {
  verificationCheckUrl,
  verificationUrl,
  allowedExtensions,
};
