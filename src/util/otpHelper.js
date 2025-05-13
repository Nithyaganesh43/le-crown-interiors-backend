const axios = require('axios');
const { VerifiedUser, AuthAttempt } = require('../model/Model');
const jwt = require('jsonwebtoken');

async function clearOtpDataBase(res) {
  await VerifiedUser.deleteMany({});
  await AuthAttempt.deleteMany({});
  res.cookie('token', '', {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'None',
  });
  res.cookie('remember', '', {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'None',
  });
}
async function sendOtp(phoneNumber, deviceId) {
  try {
    const otp = genOtp();
    const url = `https://2factor.in/API/V1/${process.env.FACTOR_API_Key}/SMS/${phoneNumber}/${otp}/OTP1`;
    const r = await axios.get(url);
    if (r.status !== 200 || r.data?.Status !== 'Success')
      return { status: false, message: 'OTP provider failed' };
    await AuthAttempt.updateOne(
      { deviceId },
      {
        $set: {
          phoneNumber,
          pendingOtp: true,
          lastAttemptToSendOtp: new Date(),
          NoAttemptToVerifyOtp: 0,
        },
      },
      { upsert: true }
    );
    const token = jwt.sign({ otp, phoneNumber }, process.env.PASSWORD, {
      expiresIn: '1d',
    });
    res.cookie('remember', token, {
      httpOnly: true,
      maxAge:  24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    });
    return { status: true, message: 'OTP sent' };
  } catch (e) {
    return { status: false, message: e.message };
  }
}

async function verifyOtp(userOtp, fingerprint) {
  try {
    
  const token = req.cookies.remember;
 
    if (!token) return { status: false, message: 'Token missing' };
    let data;
    try {
      data = jwt.verify(token, process.env.PASSWORD);
    } catch {
      return { status: false, message: 'Invalid or expired token' };
    }
    const { otp, phoneNumber } = data;
    inputCheck(otp, phoneNumber, res);
    if (String(otp) === String(userOtp)) {
      const user = new VerifiedUser({ phoneNumber, deviceId: fingerprint });
      await user.save();
      await AuthAttempt.deleteOne({ phoneNumber });

      const authToken = jwt.sign(
        { verifiedClient: phoneNumber },
        process.env.PASSWORD,
        { expiresIn: '365d' }
      );
      res.cookie('token', authToken, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None',
      });
      return { status: true, message: 'OTP verified', phoneNumber };
    }
    await AuthAttempt.updateOne(
      { phoneNumber },
      { $inc: { NoAttemptToVerifyOtp: 1 } }
    );
    return { status: false, message: 'Incorrect OTP' };
  } catch (e) {
    return { status: false, message: e.message };
  }
}

module.exports = { sendOtp, verifyOtp, clearOtpDataBase };

function genOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}
function inputCheck(userOtp, phoneNumber ,res) {

  if (userOtp && !/^\d{4}$/.test(userOtp)) {
    return res
      .status(400)
      .json({ status: false, message: 'Invalid OTP format' });
  }
  if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
    return res
      .status(400)
      .json({ status: false, message: 'Invalid phone number format' });
  } 
};