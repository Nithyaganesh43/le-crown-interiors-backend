const xss = require('xss');
const { AuthAttempt } = require('../model/Model');

module.exports = async function validator(req, res, next) {
  const b = req.body;
  const f = b.fingerprint;
  const now = Date.now();
  if (b.userOtp && !/^\d{4}$/.test(b.userOtp))
    return res.status(400).json({ status: false, message: 'Invalid OTP' });
  if (b.phoneNumber && !/^\d{10}$/.test(b.phoneNumber))
    return res
      .status(400)
      .json({ status: false, message: 'Invalid phone number' });
  
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
        'Invalid or missing browser headers or browser fingerprint data.'
      );
    }

    if (ua !== v.userAgent) {
      return await block(
        'User-Agent mismatch between request header and body.'
      );
    }

    const clientLang = v.language.split('-')[0];
    if (lang !== clientLang) {
      return await block(
        'Language mismatch between Accept-Language header and client data.'
      );
    }

    const attempt = await AuthAttempt.findOne({ deviceId: f });

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

    if (
      attempt?.lastAttemptAt &&
      now - attempt.lastAttemptAt.getTime() < 60000 
    ) {
      return await block(
        'Too many requests in a short time. Please wait 60 seconds before retrying.'
      );
    }

    await AuthAttempt.updateOne(
      { deviceId: f },
      { $set: { lastAttemptAt: new Date() } },
      { upsert: true }
    );

    next();
  } catch {
    return res
      .status(500)
      .json({ status: false, message: 'Unexpected server error in firewall.' });
  }
};
