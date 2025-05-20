const jwt = require('jsonwebtoken');
const { AuthAttempt } = require('../model/Model');

async function sendOtpRequestValidator(req, res, next, block) {
  const { phoneNumber, fingerprint } = req.body;
  const now = Date.now();
  const record = await AuthAttempt.findOne({ fingerprint });
  if (!record) {
    await new AuthAttempt({ fingerprint, phoneNumber }).save();
    return next();
  }

  if (record.isBlocked && now - record.blockedAt.getTime() < 0)
    return res.status(403).json({ status: false, message: 'Access denied' });

  if (record.failedAttempts > 3)
    return block('Too many failed attempts', fingerprint, res);

  if (record.pendingOtp && record.phoneNumber === phoneNumber) {
    await AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { failedAttempts: 1 } }
    );
    return res
      .status(403)
      .json({ status: false, message: 'OTP already pending' });
  }

  if (now - record.lastAttemptToSendOtp.getTime() < 60000) {
    await AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { failedAttempts: 1 } }
    );
    return res
      .status(400)
      .json({ status: false, message: 'Wait before retrying' });
  }

  return next();
}

async function verifyOtpRequestValidator(req, res, next, block) {
  try {
    const {  fingerprint } = req.body;
    if (!fingerprint)
      return res
        .status(403)
        .json({ status: false, message: 'fingerprint missing 1' });
    if (!req.cookies?.otpToken)
      return res
        .status(403)
        .json({ status: false, message: 'token missing 1' });

    const otpToken = jwt.verify(req.cookies.otpToken, process.env.PASSWORD);
    if (!otpToken)
      return res.status(403).json({ status: false, message: 'token expired' });

    const record = await AuthAttempt.findOne({ fingerprint });
    if (!record)
      return res
        .status(403)
        .json({ status: false, message: 'Invalid session' });

    if (record.NoAttemptToVerifyOtp > 5)
      return block('Too many attempts', fingerprint, res);

    const { otp, phoneNumber } = otpToken;
    req.userData = { otp, phoneNumber }; 
 
    return next();
  } catch (e) {
    await AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { failedAttempts: 1, NoAttemptToVerifyOtp: 1 } }
    );
    return res.status(403).json({ status: false, message: e.message });
  }
}

module.exports = { sendOtpRequestValidator, verifyOtpRequestValidator };
