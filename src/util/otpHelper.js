const axios = require('axios');
const jwt = require('jsonwebtoken');
const { VerifiedUser, AuthAttempt } = require('../model/Model');

const OTP_EXPIRY_TIME = 60 * 60 * 1000 *10;

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function sendOtp(req) {
  const { phoneNumber, fingerprint } = req.body;
  const otp = generateOtp();
  const url = `https://2factor.in/API/V1/${process.env.FACTOR_API_Key}/SMS/${phoneNumber}/${otp}/OTP1`;
  const r = await axios.get(url);
  if (r.status !== 200 || r.data?.Status !== 'Success') {
    await AuthAttempt.deleteOne({ fingerprint });
    return { status: false, message: 'Failed to send OTP via provider.' };
  }
  const token = jwt.sign(
    { phoneNumber, otp, fingerprint },
    process.env.PASSWORD,
    { expiresIn: OTP_EXPIRY_TIME }
  );
  await AuthAttempt.updateOne(
    { fingerprint },
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
  return { status: true, token };
}

async function verifyOtp(req, res) {
  const { userOtp, fingerprint } = req.body;
  if (!fingerprint) return { status: false, message: 'fingerprint missing' };
  let otpToken;
  if (!req.cookies?.otpToken)
    return { status: false, message: 'token missing 2' };
  try {
    otpToken = jwt.verify(req.cookies.otpToken, process.env.PASSWORD);
  } catch (e) {
    return { status: false, message: 'token expired' };
  }
  if (String(otpToken.otp) === String(userOtp)) {
    await new VerifiedUser({
      phoneNumber: otpToken.phoneNumber,
      fingerprint,
    }).save();
    await AuthAttempt.deleteOne({ fingerprint });
     res.cookie('otpToken', '', {
      sameSite: 'None',
      httpOnly: true,
      maxAge: 10,
    });
    return { status: true, message: 'OTP verified' };
  } else {
    await AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { NoAttemptToVerifyOtp: 1 } }
    );
    return { status: false, message: 'Incorrect OTP' };
  }
}

module.exports = { sendOtp, verifyOtp, OTP_EXPIRY_TIME };
