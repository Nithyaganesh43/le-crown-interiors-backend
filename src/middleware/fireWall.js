const xss = require('xss');
const { AuthAttempt, VerifiedUser } = require('../model/Model');

module.exports = async function validator(req, res, next) {
  try {
    const { userOtp, phoneNumber, fingerprint, userBrowserData } = req.body;
    const origin = xss(req.get('Origin') || '');
    const referer = xss(req.get('Referer') || '');
    const userAgent = xss(req.get('User-Agent') || '');
    const language = xss(
      req.get('Accept-Language')?.split(',')[0].split('-')[0] || ''
    );

    if (!origin) return await block('Access denied', fingerprint, res);
    if (!referer)
      return await block('Access denied', fingerprint, res);
    if (!userAgent.includes('Mozilla'))
      return await block('Access denied', fingerprint, res);
    if (
      !userBrowserData ||
      !userBrowserData.userAgent ||
      !userBrowserData.language
    )
      return await block('Access denied', fingerprint, res);
    if (userAgent !== userBrowserData.userAgent)
      return await block(
        'Access denied',
        fingerprint,
        res
      );
    const clientLang = userBrowserData.language.split('-')[0];
    if (language !== clientLang)
      return await block('Access denied', fingerprint, res);

    const now = Date.now();
    const isVerifyOtp = !!userOtp;
    const isSendOtp = !!phoneNumber;

    if (isVerifyOtp) {
      if (!/^\d{4}$/.test(userOtp))
        return res
          .status(400)
          .json({ status: false, message: 'Invalid OTP format' });
    }

    if (isSendOtp) {
      if (!/^\d{10}$/.test(phoneNumber))
        return res
          .status(400)
          .json({ status: false, message: 'Invalid phone number format' });
    }

    const isUserAlreadyVerified = await VerifiedUser.findOne({ phoneNumber });
    if (isUserAlreadyVerified) {
      return res.status(200).json({
        status: true,
        message: 'This number is already verified. Check your WhatsApp.',
      });
    }

    const attempt = await AuthAttempt.findOne({ deviceId: fingerprint });
    if (!attempt) {
      await new AuthAttempt({ deviceId: fingerprint }).save();
      return next();
    }

    if (attempt.blockedAt && now - attempt.blockedAt.getTime() < 86400000) {
      return res.status(403).json({
        status: false,
        message: `Access denied Policy violation found`,
      });
    }

    if (attempt.failedAttempts > 2)
      return await block(
        'Access denied Policy violation found',
        fingerprint,
        res
      );

    if (attempt.NoAttemptToVerifyOtp > 5)
      return await block(
        'Access denied Policy violation found',
        fingerprint,
        res
      );

    if (isSendOtp && attempt.pendingOtp) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { $inc: { failedAttempts: 1 } }
      );
      return res.status(403).json({
        status: false,
        message:
          'An OTP is already pending verification for the number ending in ' +
          phoneNumber.slice(-3),
      });
    }

    if (isSendOtp && now - attempt.lastAttemptToSendOtp.getTime() < 60000) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { $inc: { failedAttempts: 1 } }
      );
      return res.status(400).json({
        status: false,
        message: 'OTP was just requested. Please wait a few minutes. Try again later',
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

async function block(reason, fingerprint, res) {
  await AuthAttempt.updateOne(
    { deviceId: fingerprint },
    {
      $set: {
        isBlocked: true,
        blockedAt: new Date(),
        reasonForBlocked: reason,
      },
    },
    { upsert: true }
  );
  return res
    .status(403)
    .json({ status: false, message: `Access denied ` });
}
