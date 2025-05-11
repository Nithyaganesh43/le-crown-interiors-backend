const xss = require('xss');
const { AuthAttempt, VerifiedUser } = require('../model/Model');

module.exports = async function validator(req, res, next) {
  const b = req.body;
  const f = b.fingerprint;
  const now = Date.now();

  const block = async (m) => {
    await AuthAttempt.updateOne(
      { deviceId: f },
      { $set: { isBlocked: true, blockedAt: new Date(), failedAttempts: 0 } }
    );
    return res.status(403).json({ status: false, message: m });
  };

  try {
    if (b.phoneNumber) {
      let n = b.phoneNumber.replace(/[^\d]/g, '');
      b.phoneNumber = n.startsWith('91') ? `+${n}` : `+91${n}`;
      if (!/^\+91\d{10}$/.test(b.phoneNumber))
        return res
          .status(400)
          .json({ status: false, message: 'Invalid phone' });
    }

    if (b.userOtp && !/^\d{4}$/.test(b.userOtp))
      return res.status(400).json({ status: false, message: 'Invalid OTP' });

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
    )
      return await block('Blocked: invalid client');

    if (ua !== v.userAgent) return await block('Blocked: user agent mismatch');

    const clientLang = v.language.split('-')[0];
    if (lang && clientLang && lang !== clientLang)
      return await block('Blocked: language mismatch');

    if (!b.phoneNumber && !b.userOtp) return next();

    const verified = await VerifiedUser.findOne({
      phoneNumber: b.phoneNumber,
    }).select('_id');
    if (verified)
      return res
        .status(200)
        .json({ status: true, message: 'Phone already verified' });

    let e = await AuthAttempt.findOne({ deviceId: f }).select(
      'isBlocked blockedAt failedAttempts lastAttemptAt pendingOtp'
    );
    if (!e) {
      await AuthAttempt.create({
        deviceId: f,
        phoneNumber: b.phoneNumber || '',
        pendingOtp: true,
      });
      return next();
    }

    if (e.pendingOtp)
      return res
        .status(429)
        .json({ status: false, message: 'OTP sent. Wait for verification' });

    if (e.isBlocked && e.blockedAt && now - e.blockedAt.getTime() < 86400000)
      return res
        .status(403)
        .json({ status: false, message: 'Blocked for 24 hours' });

    if (e.failedAttempts >= 3) return await block('Too many attempts');

    if (e.lastAttemptAt && now - e.lastAttemptAt.getTime() < 60000)
      return await block('Too frequent attempts');

    await AuthAttempt.updateOne(
      { deviceId: f },
      { $inc: { failedAttempts: 1 }, lastAttemptAt: new Date() }
    );

    return res.status(400).json({ status: false, message: 'Request blocked' });
  } catch {
    return res.status(500).json({ status: false, message: 'Internal error' });
  }
};
