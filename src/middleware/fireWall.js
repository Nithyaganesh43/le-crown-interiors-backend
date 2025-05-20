const { AuthAttempt, VerifiedUser } = require('../model/Model');
const {
  sendOtpRequestValidator,
  verifyOtpRequestValidator,
} = require('./requestValidator');

module.exports = async function firewall(req, res, next) {
  try {
    const { userOtp, phoneNumber, fingerprint, userBrowserData } = req.body;
    const origin = req.get('Origin') || '',
      referer = req.get('Referer') || '',
      ua = req.get('User-Agent') || '';
    const langRaw = req.get('Accept-Language'),
      lang = langRaw?.split(',')[0]?.split('-')[0] || '';
    if (!origin || !referer || !ua.includes('Mozilla'))
      return block('Invalid headers', fingerprint, res);
    if (!userBrowserData?.userAgent || !userBrowserData?.language)
      return block('Missing browser data', fingerprint, res);
    if (ua !== userBrowserData.userAgent)
      return block('User agent mismatch', fingerprint, res);
    if (lang !== userBrowserData.language.split('-')[0])
      return block('Language mismatch', fingerprint, res);
    if (userOtp && (userOtp.length !== 4 || !/^\d{4}$/.test(userOtp)))
      return res
        .status(400)
        .json({ status: false, message: 'Invalid OTP format' });
    if (
      phoneNumber &&
      !/^(\+91|0)?\d{10}$/.test(phoneNumber.replace(/\s+/g, ''))
    )
      return res
        .status(400)
        .json({ status: false, message: 'Invalid phone number format' });

    const token = req.cookies?.authToken;
    if (token == process.env.PASSWORD) {
      return res.status(200).json({
        status: true,
        message: 'Already Authorized.',
      });
    }

    const exists = await VerifiedUser.exists({
      $or: [{ phoneNumber }, { fingerprint }],
    });
    if (exists)
      return res.status(200).json({
        status: true,
        message: 'Already verified. Check WhatsApp.',
      });

    if (userOtp && !phoneNumber)
      return verifyOtpRequestValidator(req, res, next, block);
    if (phoneNumber && !userOtp)
      return sendOtpRequestValidator(req, res, next, block);

    return res.status(400).json({ status: false, message: 'Invalid request' });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
};

function block(reason, fingerprint, res) {
  if (fingerprint) {
    AuthAttempt.updateOne(
      { fingerprint },
      {
        $set: {
          isBlocked: true,
          blockedAt: new Date(),
          reasonForBlocked: reason,
        },
      },
      { upsert: true }
    ).catch(() => {});
  }
  return res.status(403).json({ status: false, message: 'Access denied' });
}
