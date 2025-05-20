const axios = require('axios');
const jwt = require('jsonwebtoken');
const { VerifiedUser, AuthAttempt } = require('../model/Model');

const OTP_EXPIRY_TIME = 60 * 60 * 1e3 * 10;

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
  const now = new Date();

  await AuthAttempt.updateOne(
    { fingerprint },
    {
      $set: {
        phoneNumber,
        pendingOtp: true,
        failedAttempts: 0,
        lastAttemptToSendOtp: now,
        NoAttemptToVerifyOtp: 0,
      },
    },
    { upsert: true }
  );

  return { status: true, token, otp };
}

async function verifyOtp(req, res) {
  const { userOtp, fingerprint } = req.body;
  if (!fingerprint) return { status: false, message: 'fingerprint missing' };
  const tokenStr = req.cookies?.otpToken;
  if (!tokenStr) return { status: false, message: 'token missing 2' };

  try {
    const { otp, phoneNumber } = jwt.verify(tokenStr, process.env.PASSWORD);
    if (userOtp !== otp.toString())
      return { status: false, message: 'Invalid OTP' };
    await Promise.all([
      VerifiedUser.updateOne(
        { phoneNumber },
        { $set: { verified: true } },
        { upsert: true }
      ),
      AuthAttempt.updateOne({ fingerprint }, { $set: { pendingOtp: false } }),
    ]);
    return { status: true, message: 'Verified successfully' };
  } catch (e) {
    AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { failedAttempts: 1, NoAttemptToVerifyOtp: 1 } }
    ).exec();
    return { status: false, message: e.message };
  }
}

module.exports = { sendOtp, verifyOtp, OTP_EXPIRY_TIME };
