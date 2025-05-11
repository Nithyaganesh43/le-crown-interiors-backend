const axios = require('axios');
const { VerifiedUser } = require('../model/Model');

const otpCache = new Map();
const OTP_EXPIRY_TIME = 5 * 60 * 1000;

async function sendOtp(number) {
  try {
    const otp = generateFourDigitNumber();
    const url = `https://2factor.in/API/V1/${process.env.FACTOR_API_Key}/SMS/${number}/${otp}/OTP1`;

    const response = await axios.get(url);

    if (response.status !== 200 || response.data?.Status !== 'Success') {
      return { status: false, message: 'Failed to send OTP' };
    }

    otpCache.set(number, { otpCode: otp, createdAt: Date.now() });

    return { status: true, message: 'OTP sent successfully' };
  } catch (e) {
    if (e.response) {
      return {
        status: false,
        message: e.response.data?.Details || 'OTP send failed',
      };
    } else {
      return { status: false, message: 'OTP send failed' };
    }
  }
}

function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function verifyOtp(phoneNumber, userOtp) {
  try {
    const cachedOtp = otpCache.get(phoneNumber);

    if (cachedOtp) {
      const { otpCode, createdAt } = cachedOtp;

      if (Date.now() - createdAt > OTP_EXPIRY_TIME) {
        otpCache.delete(phoneNumber);
        return { status: false, message: 'OTP has expired' };
      }
 
      if (String(otpCode) === String(userOtp)) {
        const newUser = new VerifiedUser({ phoneNumber });
        newUser.save().catch(() => {});

        otpCache.delete(phoneNumber);

        return { status: true, message: 'OTP verified successfully' };
      } else {
        await AuthAttempt.updateOne(
          { phoneNumber },
          { $inc: { failedAttempts: 1 }, lastAttemptAt: new Date() }
        );
        return { status: false, message: 'OTP not matched' };
      }
    } else {
      return { status: false, message: 'OTP not found' };
    }
  } catch (e) {
    return { status: false, message: e.message || 'Verification failed' };
  }
}

module.exports = { sendOtp, verifyOtp };
