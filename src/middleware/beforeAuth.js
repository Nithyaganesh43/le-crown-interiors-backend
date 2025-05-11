const { AuthAttempt, VerifiedUser } = require('../model/Model');

async function processOtpAttempt(req, res, next) {
  console.log(req.body);
  next();
  // const { userBrowserData, fingerprint, phoneNumber } = req.body;
  // let n = phoneNumber.replace(/[^\d]/g, '');
  // n = n.startsWith('91') ? '+' + n : '+91' + n;
  // if (!/^\+91\d{10}$/.test(n))
  //   return res
  //     .status(400)
  //     .json({ status: false, message: 'Invalid phone number' });

  // const verified = await VerifiedUser.findOne({ phoneNumber: n }).select('_id');
  // if (verified)
  //   return res
  //     .status(200)
  //     .json({ status: true, message: 'Phone number already verified' });

  // const ua = req.get('User-Agent');
  // const lang = req.get('Accept-Language')?.split(',')[0] || '';
  // const isMatch =
  //   ua === userBrowserData?.userAgent && lang === userBrowserData?.language;

  // let entry = await AuthAttempt.findOne({ deviceId: fingerprint }).select(
  //   'isBlocked blockedAt failedAttempts lastAttemptAt'
  // );
  // const now = Date.now();

  // if (!entry) {
  //   await AuthAttempt.create({ deviceId: fingerprint, phoneNumber: n });
  //   return next();
  // }

  // if (
  //   entry.isBlocked &&
  //   entry.blockedAt &&
  //   now - entry.blockedAt.getTime() > 86400000
  // ) {
  //   await AuthAttempt.updateOne(
  //     { deviceId: fingerprint },
  //     { isBlocked: false, failedAttempts: 0, blockedAt: null }
  //   );
  //   entry.isBlocked = false;
  //   entry.failedAttempts = 0;
  //   entry.blockedAt = null;
  // }

  // if (entry.isBlocked) {
  //   return res
  //     .status(403)
  //     .json({
  //       status: false,
  //       message: 'Too many failed attempts. Try again in 24h',
  //     });
  // }

  // if (entry.failedAttempts >= 3) {
  //   await AuthAttempt.updateOne(
  //     { deviceId: fingerprint },
  //     { isBlocked: true, blockedAt: new Date() }
  //   );
  //   return res
  //     .status(403)
  //     .json({
  //       status: false,
  //       message: 'Too many failed attempts. You are blocked',
  //     });
  // }

  // if (entry.lastAttemptAt && now - entry.lastAttemptAt.getTime() < 60000) {
  //   return res
  //     .status(429)
  //     .json({ status: false, message: 'Wait before trying again' });
  // }

  // if (isMatch) {
  //   await AuthAttempt.updateOne(
  //     { deviceId: fingerprint },
  //     { lastAttemptAt: new Date() }
  //   );
  //   return next();
  // }

  // await AuthAttempt.updateOne(
  //   { deviceId: fingerprint },
  //   { $inc: { failedAttempts: 1 }, lastAttemptAt: new Date() }
  // );
  // return res
  //   .status(400)
  //   .json({ status: false, message: 'Browser/device mismatch' });
}

module.exports = processOtpAttempt;
