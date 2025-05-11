const xss = require('xss');
const { AuthAttempt } = require('../model/Model');

module.exports = async function validator(req, res, next) {
  const b = req.body;
  const f = b.fingerprint;
  const now = Date.now();

  const isVerifyOtp = !!b.userOtp;
  const isSendOtp = !!b.phoneNumber;

  // Basic format validations
  if (isVerifyOtp && !/^\d{4}$/.test(b.userOtp))
    return res
      .status(400)
      .json({ status: false, message: 'Invalid OTP format' });

  if (isSendOtp && !/^\d{10}$/.test(b.phoneNumber))
    return res
      .status(400)
      .json({ status: false, message: 'Invalid phone number format' });

  const block = async (reason) => {
    await AuthAttempt.updateOne(
      { deviceId: f },
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
  };

  try {
    // Validate browser headers & fingerprint
    const v = b.userBrowserData;
    const origin = xss(req.get('Origin') || '');
    const referer = xss(req.get('Referer') || '');
    const ua = xss(req.get('User-Agent') || '');
    const lang = xss(
      req.get('Accept-Language')?.split(',')[0].split('-')[0] || ''
    );

    if (
      !origin ||
      !referer ||
      !ua.includes('Mozilla') ||
      !v ||
      !v.userAgent ||
      !v.language
    ) {
      return await block(
        'Missing or invalid browser headers or fingerprint data.'
      );
    }

    if (ua !== v.userAgent) {
      return await block(
        'User-Agent mismatch between headers and client data.'
      );
    }

    const clientLang = v.language.split('-')[0];
    if (lang !== clientLang) {
      return await block('Language mismatch between headers and client data.');
    }

    const attempt = await AuthAttempt.findOne({ deviceId: f });

    // Check 24-hour block
    if (
      attempt?.isBlocked &&
      attempt.blockedAt &&
      now - attempt.blockedAt.getTime() < 86400000
    ) {
      return res.status(403).json({
        status: false,
        message: `Access denied: Device blocked for 24 hours. Reason: ${
          attempt.reasonForBlocked || 'Policy violation.'
        }`,
      });
    }

    // Apply rate limiting ONLY on sending OTP
    if (isSendOtp) {
      if (
        attempt?.lastAttemptAt &&
        now - attempt.lastAttemptAt.getTime() < 60000
      ) {
        return await block(
          'Too many OTP requests. Please wait 60 seconds before retrying.'
        );
      }

      // Update last attempt time only for sending
      await AuthAttempt.updateOne(
        { deviceId: f },
        { $set: { lastAttemptAt: new Date() } },
        { upsert: true }
      );
    }

    next();
  } catch (err) {
    console.error('Firewall error:', err);
    return res
      .status(500)
      .json({ status: false, message: 'Unexpected server error in firewall.' });
  }
};
