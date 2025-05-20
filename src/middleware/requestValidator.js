const jwt = require('jsonwebtoken');
const { AuthAttempt } = require('../model/Model');

async function sendOtpRequestValidator(req, res, next, block) {
  const { phoneNumber, fingerprint } = req.body;
  const now = Date.now();
  const r = await AuthAttempt.findOne({ fingerprint }).lean();

  if (!r) {
    await new AuthAttempt({ fingerprint, phoneNumber }).save();
    return next();
  }

  if (r.isBlocked && now < r.blockedAt.getTime())
    return res.status(403).json({ status: false, message: 'Access denied' });
  if (r.failedAttempts > 3)
    return block('Too many failed attempts', fingerprint, res);
  if (r.pendingOtp && r.phoneNumber === phoneNumber) {
    AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { failedAttempts: 1 } }
    ).exec();
    return res
      .status(403)
      .json({ status: false, message: 'OTP already pending' });
  }

  if (now - r.lastAttemptToSendOtp.getTime() < 60000) {
    AuthAttempt.updateOne(
      { fingerprint },
      { $inc: { failedAttempts: 1 } }
    ).exec();
    return res
      .status(400)
      .json({ status: false, message: 'Wait before retrying' });
  }

  next();
}

async function verifyOtpRequestValidator(req, res, next, block) {
  try {
    const { fingerprint } = req.body,
      token = req.cookies?.otpToken;
    if (!fingerprint)
      return res
        .status(403)
        .json({ status: false, message: 'fingerprint missing' });
    if (!token)
      return res.status(403).json({ status: false, message: 'token missing' });

    const { otp, phoneNumber } = jwt.verify(token, process.env.PASSWORD);
    const r = await AuthAttempt.findOne({ fingerprint }).lean();
    if (!r)
      return res
        .status(403)
        .json({ status: false, message: 'Invalid session' });
    if (r.NoAttemptToVerifyOtp > 5)
      return block('Too many attempts', fingerprint, res);

    req.userData = { otp, phoneNumber };
    next();
  } catch (e) {
    AuthAttempt.updateOne(
      { fingerprint: req.body.fingerprint },
      { $inc: { failedAttempts: 1, NoAttemptToVerifyOtp: 1 } }
    ).exec();
    res.status(403).json({ status: false, message: e.message });
  }
}

module.exports = { sendOtpRequestValidator, verifyOtpRequestValidator };
