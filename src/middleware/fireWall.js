const xss = require('xss');
const { AuthAttempt, VerifiedUser } = require('../model/Model');

module.exports = async function validator(req, res, next) {
  try {
    const { userOtp, phoneNumber, fingerprint, userBrowserData } = req.body;

    //browser check
    
    const origin = xss(req.get('Origin') || '');
    const referer = xss(req.get('Referer') || '');
    const userAgent = xss(req.get('User-Agent') || '');
    const language = xss(
      req.get('Accept-Language')?.split(',')[0].split('-')[0] || ''
    );

    if (
      !origin ||
      !referer ||
      !userAgent.includes('Mozilla') ||
      !userBrowserData ||
      !userBrowserData.userAgent ||
      !userBrowserData.language
    )
      return await block(
        'Missing or invalid browser headers or fingerprint data.'
      );

    if (userAgent !== userBrowserData.userAgent)
      return await block(
        'User-Agent mismatch between headers and client data.'
      );

    const clientLang = userBrowserData.language.split('-')[0];
    if (language !== clientLang)
      return await block('Language mismatch between headers and client data.');

    const now = Date.now();
    const isVerifyOtp = !!userOtp;
    const isSendOtp = !!phoneNumber;

    //validation of otp and phno

    if (isVerifyOtp && !/^\d{4}$/.test(userOtp))
      return res
        .status(400)
        .json({ status: false, message: 'Invalid OTP format' });

    if (isSendOtp && !/^\d{10}$/.test(phoneNumber))
      return res
        .status(400)
        .json({ status: false, message: 'Invalid phone number format' });

    //isUserAlreadyVerified

    const isUserAlreadyVerified = await VerifiedUser.findOne({ phoneNumber });
    if (isUserAlreadyVerified)
      return res.status(200).json({
        status: true,
        message: `this number is already verified check your wahtsapp`,
      });

    //attempt check

    const attempt = await AuthAttempt.findOne({ deviceId: fingerprint });
    if (!attempt) {
      await new AuthAttempt({ deviceId: fingerprint }).save();
      return next();
    }
    //blocked check
    if (attempt.blockedAt && now - attempt.blockedAt.getTime() < 86400000)
      return res.status(403).json({
        status: false,
        message: `Access denied: Device blocked for 24 hours. Reason: ${
          attempt.reasonForBlocked || 'Policy violation.'
        }`,
      });

    //limit check

    if (attempt.failedAttempts > 2)
      return await block('More failed attempted to send otp');

    if (attempt.NoAttemptToVerifyOtp > 5)
      return await block('More failed attempted to verify Otp');

    //is otp send but not verified check

    if (attempt.pendingOtp) {
      await AuthAttempt.updateOne(
        { fingerprint },
        { $inc: { failedAttempts: 1 } }
      );
      return res.status(403).json({
        status: false,
        message: `Previous otp still pending to verified`,
      });
    }

    //is SendOtp requested just now check

    if (isSendOtp && now - attempt.lastAttemptToSendOtp.getTime() < 60000) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { $inc: { failedAttempts: 1 } }
      );
      return res.status(400).json({
        status: false,
        message: 'Otp requested just now wait for few minutes',
      });
    }

    next();

  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
async function block(reason) {
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
    .json({ status: false, message: `Access denied: ${reason}` });
}
