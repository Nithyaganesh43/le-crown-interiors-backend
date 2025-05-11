const axios = require('axios');
const { VerifiedUser, AuthAttempt } = require('../model/Model');

const otpCache = new Map();
const OTP_EXPIRY_TIME = 5 * 60 * 1000;

function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function sendOtp(phoneNumber, deviceId) {
  try {
    const otp = generateFourDigitNumber();
    // const url = `https://2factor.in/API/V1/${process.env.FACTOR_API_Key}/SMS/${phoneNumber}/${otp}/OTP1`;
    // const response = await axios.get(url);
    // if (response.status !== 200 || response.data?.Status !== 'Success') {
    //   return { status: false, message: 'Failed to send OTP via provider.' };
    // }
    otpCache.set(phoneNumber, { otpCode: otp, createdAt: Date.now() });
    await AuthAttempt.updateOne(
      { deviceId },
      {
        $set: {
          phoneNumber,
          pendingOtp: true,
          failedAttempts: 0,
          lastAttemptToSendOtp: new Date(),
          NoAttemptToVerifyOtp: 0,
        },
      },
      { upsert: true }
    );
    const test = await AuthAttempt.findOne({ deviceId });
    console.log(test);
    console.log('otp send ' + otp);
    return { status: true, message: 'OTP sent successfully.' + otp };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
}

async function verifyOtp(phoneNumber, userOtp, fingerprint) {
  try {
    const cachedOtp = otpCache.get(phoneNumber);
    if (!cachedOtp) {
      return {
        status: false,
        message: 'No OTP found for this number. Please request again.',
      };
    }
    const { otpCode, createdAt } = cachedOtp;
    if (Date.now() - createdAt > OTP_EXPIRY_TIME) {
      otpCache.delete(phoneNumber);
      return {
        status: false,
        message: 'OTP has expired. Please request a new one.',
      };
    }
    if (String(otpCode) === String(userOtp)) {
      const newUser = new VerifiedUser({ phoneNumber, deviceId: fingerprint });
      await newUser.save();
      await AuthAttempt.deleteOne({ deviceId: fingerprint });
      otpCache.delete(phoneNumber);
      return { status: true, message: 'OTP verified successfully.' };
    } else {
      await AuthAttempt.updateOne(
        { deviceId },
        { $inc: { failedAttempts: 1 }, $inc: { NoAttemptToVerifyOtp: 1 } }
      );
      return { status: false, message: 'Invalid OTP. Please try again.' };
    }
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
}

module.exports = { sendOtp, verifyOtp };
