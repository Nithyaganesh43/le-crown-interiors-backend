const { AuthAttempt, VerifiedUser } = require('../model/Model');

async function processOtpAttempt(req, res, next) {
  try {
    const { userBrowserData, fingerprint, phoneNumber } = req.body;
    let n = phoneNumber.replace(/[^\d]/g, '');
    n = n.startsWith('91') ? '+' + n : '+91' + n;
    if (!/^\+91\d{10}$/.test(n)) throw 'e';

    const origin = req.get('Origin') || '';
    const referer = req.get('Referer') || '';
    const ua = req.get('User-Agent') || '';
    const lang = req.get('Accept-Language')?.split(',')[0] || '';

    if (
      !origin ||
      !referer ||
      !ua.includes('Mozilla') ||
      !userBrowserData ||
      ua !== userBrowserData.userAgent ||
      lang !== userBrowserData.language
    )
      throw 'e';

    const verified = await VerifiedUser.findOne({ phoneNumber: n }).select(
      '_id'
    );
    if (verified)
      return res
        .status(200)
        .json({ status: true, message: 'Phone number already verified' });

    let entry = await AuthAttempt.findOne({ deviceId: fingerprint }).select(
      'isBlocked blockedAt failedAttempts lastAttemptAt'
    );
    const now = Date.now();

    if (!entry) {
      await AuthAttempt.create({ deviceId: fingerprint, phoneNumber: n });
      return next();
    }

    if (
      entry.isBlocked &&
      entry.blockedAt &&
      now - entry.blockedAt.getTime() > 86400000
    ) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { isBlocked: false, failedAttempts: 0, blockedAt: null }
      );
      entry.isBlocked = false;
      entry.failedAttempts = 0;
      entry.blockedAt = null;
    }

    if (entry.isBlocked || entry.failedAttempts >= 3) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { isBlocked: true, blockedAt: new Date() }
      );
      throw 'e';
    }

    if (entry.lastAttemptAt && now - entry.lastAttemptAt.getTime() < 60000)
      throw 'e';

    if (ua === userBrowserData.userAgent && lang === userBrowserData.language) {
      await AuthAttempt.updateOne(
        { deviceId: fingerprint },
        { lastAttemptAt: new Date() }
      );
      return next();
    }

    await AuthAttempt.updateOne(
      { deviceId: fingerprint },
      { $inc: { failedAttempts: 1 }, lastAttemptAt: new Date() }
    );
    throw 'e';
  } catch {
    return res
      .status(400)
      .json({ status: false, message: 'Something went wrong' });
  }
}

module.exports = processOtpAttempt;
