const { AuthAttempt } = require('../../model/Model');
const { block } = require('./block');

module.exports = async function attemptCheck(req, res, next) {
  const { fingerprint, phoneNumber, userOtp } = req.body;
  const isSendOtp = !!phoneNumber;
  const isVerifyOtp = !!userOtp;

  if (isSendOtp) {
    const a = await AuthAttempt.findOne({ deviceId: fingerprint });

    if (!a) {
      await new AuthAttempt({
        deviceId: fingerprint,
        phoneNumber,
        NoAttemptToSendOtp: 1,
      }).save();
      return next();
    }

    if (!(await commonCheck(a, fingerprint, res))) return;

    if (a.NoAttemptToSendOtp > 5) {
      await block(
        'Too many OTP requests. Please wait before trying again.',
        fingerprint,
        res
      );
      return;
    }

    if (a.pendingOtp) {
      res.status(403).json({
        status: false,
        message: `OTP already sent to this number (ending in ${phoneNumber.slice(
          -3
        )}). Verify it before requesting another.`,
      });
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { $inc: { fackAttempts: 1 } }
      );
      return;
    }

    if (Date.now() - a.lastAttemptToSendOtp.getTime() < 60000) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { $inc: { fackAttempts: 1 } }
      );
      res
        .status(400)
        .json({
          status: false,
          message: 'Wait 1 minute before requesting another OTP.',
        });
      return;
    }

    return next();
  }

  if (isVerifyOtp) {
    const a = await AuthAttempt.findOne({ phoneNumber });

    if (!a) {
      await block(
        'Invalid OTP verification attempt detected.',
        fingerprint,
        res
      );
      return;
    }

    if (!(await commonCheck(a, fingerprint, res))) return;

    if (a.NoAttemptToVerifyOtp > 5) {
      await block(
        'Too many incorrect OTPs. Access temporarily blocked.',
        fingerprint,
        res
      );
      return;
    }

    return next();
  }

  await block('Unrecognized access attempt.', fingerprint, res);
};

async function commonCheck(a, fingerprint, res) {
  const now = Date.now();

  if (a.blockedAt && now - a.blockedAt.getTime() < 86400000) {
    res.status(403).json({ status: false, message: a.reasonForBlocked });
    return false;
  }

  if (a.fackAttempts > 3) {
    await block(
      'Multiple invalid actions detected. Access temporarily restricted.',
      fingerprint,
      res
    );
    return false;
  }

  return true;
}
