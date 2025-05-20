const express = require('express');
const router = express.Router();
const fireWall = require('../middleware/fireWall');
const { sendOtp, verifyOtp } = require('../util/otpHelper');
const { VerifiedUser, AuthAttempt } = require('../model/Model');
const { OTP_EXPIRY_TIME } = require('../util/otpHelper');

router.get('/deleteall', async (req, res) => {
  try {
    await VerifiedUser.deleteMany({});
    await AuthAttempt.deleteMany({});
    res.cookie('authToken', '', {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
      maxAge: 10,
    });
    res.cookie('otpToken', '', {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
      maxAge: 10,
    });
    res.json({ status: true, message: 'All data deleted' });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Error deleting data' });
  }
});

router.use(fireWall);

router.post('/sendotp', async (req, res) => {
  try {
    const result = await sendOtp(req);
    if (!result.status) return res.status(400).json(result);
    res.cookie('otpToken', result.token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: OTP_EXPIRY_TIME,
    });
    res.status(200).json({ status: true, message: 'OTP sent:' + result.otp });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

router.post('/verifyotp', async (req, res) => {
  try {
    const result = await verifyOtp(req, res);
    if (!result.status) return res.status(400).json(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

module.exports = router;

(async () => {
  await VerifiedUser.deleteMany({});
  await AuthAttempt.deleteMany({});
})();
