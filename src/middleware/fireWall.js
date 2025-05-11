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

    console.log('Browser Headers:', { origin, referer, userAgent, language });
    console.log('Client Browser Data:', userBrowserData);

    if (!origin) {
      console.log('Check Failed: Missing Origin header');
      return await block('Missing Origin header', fingerprint, res);
    } else console.log('Check Passed: Origin header exists');

    if (!referer) {
      console.log('Check Failed: Missing Referer header');
      return await block('Missing Referer header', fingerprint, res);
    } else console.log('Check Passed: Referer header exists');

    if (!userAgent.includes('Mozilla')) {
      console.log('Check Failed: User-Agent not Mozilla');
      return await block('User-Agent not valid browser', fingerprint, res);
    } else console.log('Check Passed: User-Agent is Mozilla-based');

    if (
      !userBrowserData ||
      !userBrowserData.userAgent ||
      !userBrowserData.language
    ) {
      console.log('Check Failed: Missing user browser data');
      return await block('Missing browser data from client', fingerprint, res);
    } else console.log('Check Passed: Client browser data present');

    if (userAgent !== userBrowserData.userAgent) {
      console.log('Check Failed: User-Agent mismatch');
      return await block(
        'User-Agent mismatch between headers and client data',
        fingerprint,
        res
      );
    } else console.log('Check Passed: User-Agent matches');

    const clientLang = userBrowserData.language.split('-')[0];
    if (language !== clientLang) {
      console.log('Check Failed: Language mismatch');
      return await block(
        'Language mismatch between headers and client data',
        fingerprint,
        res
      );
    } else console.log('Check Passed: Language matches');

    const now = Date.now();
    const isVerifyOtp = !!userOtp;
    const isSendOtp = !!phoneNumber;
    console.log('isVerifyOtp:', isVerifyOtp, 'isSendOtp:', isSendOtp);

    if (isVerifyOtp) {
      if (!/^\d{4}$/.test(userOtp)) {
        console.log('Check Failed: Invalid OTP format:', userOtp);
        return res
          .status(400)
          .json({ status: false, message: 'Invalid OTP format' });
      } else console.log('Check Passed: OTP format valid');
    }

    if (isSendOtp) {
      if (!/^\d{10}$/.test(phoneNumber)) {
        console.log('Check Failed: Invalid phone number format:', phoneNumber);
        return res
          .status(400)
          .json({ status: false, message: 'Invalid phone number format' });
      } else console.log('Check Passed: Phone number format valid');
    }

    const isUserAlreadyVerified = await VerifiedUser.findOne({ phoneNumber });
    if (isUserAlreadyVerified) {
      console.log('Check Passed: User already verified:', phoneNumber);
      return res.status(200).json({
        status: true,
        message: 'this number is already verified check your wahtsapp',
      });
    } else console.log('Check Passed: Not previously verified');

    const attempt = await AuthAttempt.findOne({ deviceId: fingerprint });
    if (!attempt) {
      console.log('Check Passed: No previous attempt found, creating new');
      await new AuthAttempt({ deviceId: fingerprint }).save();
      return next();
    } else console.log('Previous attempt found:', attempt);

    if (attempt.blockedAt && now - attempt.blockedAt.getTime() < 86400000) {
      console.log('Check Failed: Device is blocked');
      return res.status(403).json({
        status: false,
        message: `Access denied: Device blocked for 24 hours. Reason: ${
          attempt.reasonForBlocked || 'Policy violation.'
        }`,
      });
    } else console.log('Check Passed: Device not blocked');

    if (attempt.failedAttempts > 2) {
      console.log(
        'Check Failed: Too many failed send attempts:',
        attempt.failedAttempts
      );
      return await block('More failed attempted to send otp', fingerprint, res);
    } else console.log('Check Passed: Failed send attempts acceptable');

    if (attempt.NoAttemptToVerifyOtp > 5) {
      console.log(
        'Check Failed: Too many failed verify attempts:',
        attempt.NoAttemptToVerifyOtp
      );
      return await block(
        'More failed attempted to verify Otp',
        fingerprint,
        res
      );
    } else console.log('Check Passed: Failed verify attempts acceptable');

    if (attempt.pendingOtp) {
      console.log('Check Failed: OTP already pending');
      await AuthAttempt.updateOne(
        { fingerprint },
        { $inc: { failedAttempts: 1 } }
      );
      return res.status(403).json({
        status: false,
        message: 'Previous otp still pending to verified',
      });
    } else console.log('Check Passed: No pending OTP');

    if (isSendOtp && now - attempt.lastAttemptToSendOtp.getTime() < 60000) {
      console.log('Check Failed: OTP request too soon');
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { $inc: { failedAttempts: 1 } }
      );
      return res.status(400).json({
        status: false,
        message: 'Otp requested just now wait for few minutes',
      });
    } else if (isSendOtp) {
      console.log('Check Passed: OTP request allowed');
    }

    console.log('All validations passed. Proceeding to next middleware.');
    next();
  } catch (err) {
    console.log('Validator Error:', err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

async function block(reason, fingerprint, res) {
  console.log('Blocking device:', fingerprint, 'Reason:', reason);
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
