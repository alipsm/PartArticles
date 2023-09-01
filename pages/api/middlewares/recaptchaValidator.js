const axios = require("axios");

async function validateRecaptchaToken(token, ip) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_CAPTCHA_SERVER_KEY}&response=${token}&remoteip=${ip}`;
  try {
    if (!token) {
      console.error("ReCaptcha Error: Empity token!")
      throw new Error();
    }
    const response = await axios.get(url);
    return response.data.success;
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateRecaptchaToken,
};
