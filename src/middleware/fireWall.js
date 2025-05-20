const xss = require('xss');
const { AuthAttempt, VerifiedUser } = require('../model/Model');
const {
  sendOtpRequestValidator,
  verifyOtpRequestValidator,
} = require('./requestValidator');

module.exports = async function firewall(req, res, next) {
  try {

    console.log(' Cookies:', req.cookies);
    const { userOtp, phoneNumber, fingerprint, userBrowserData } = req.body;
    const origin = xss(req.get('Origin') || '');
    const referer = xss(req.get('Referer') || '');
    const userAgent = xss(req.get('User-Agent') || '');
    const language = xss(
      req.get('Accept-Language')?.split(',')[0].split('-')[0] || ''
    );

    if (!origin || !referer || !userAgent.includes('Mozilla'))
      return block('Invalid headers', fingerprint, res);

    if (
      !userBrowserData ||
      !userBrowserData.userAgent ||
      !userBrowserData.language
    )
      return block('Missing browser data', fingerprint, res);

    if (userAgent !== userBrowserData.userAgent)
      return block('User agent mismatch', fingerprint, res);

    const clientLang = userBrowserData.language.split('-')[0];
    if (language !== clientLang)
      return block('Language mismatch', fingerprint, res);

    if (userOtp && !/^\d{4}$/.test(userOtp))
      return res
        .status(400)
        .json({ status: false, message: 'Invalid OTP format' });

    if (
      phoneNumber &&
      !/^(\+91\s?|0)?\d{10}$/.test(phoneNumber.replace(/\s+/g, ''))
    )
      return res
        .status(400)
        .json({ status: false, message: 'Invalid phone number format' });

    const verified = await VerifiedUser.findOne({ phoneNumber });
    if (verified)
      return res
        .status(200)
        .json({ status: true, message: 'Already verified. Check WhatsApp.' });

    if (userOtp && !phoneNumber)
      return await verifyOtpRequestValidator(req, res, next, block);
    else if (!userOtp && phoneNumber)
      return await sendOtpRequestValidator(req, res, next, block);
    else
      return res
        .status(400)
        .json({ status: false, message: 'Invalid request' });
  } catch (e) {
    return res.status(500).json({ status: false, message: e.message });
  }
};

async function block(reason, fingerprint, res) {
  if (fingerprint) {
    await AuthAttempt.updateOne(
      { fingerprint },
      {
        $set: {
          isBlocked: true,
          blockedAt: new Date(),
          reasonForBlocked: reason,
        },
      },
      { upsert: true }
    );
  }
  return res.status(403).json({ status: false, message: 'Access denied' });
}
