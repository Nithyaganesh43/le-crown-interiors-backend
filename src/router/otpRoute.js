const express = require('express');
const router = express.Router();
const fireWall = require('../middleware/fireWall');
const { sendOtp, verifyOtp, OTP_EXPIRY_TIME } = require('../util/otpHelper');
const { VerifiedUser, AuthAttempt } = require('../model/Model');

router.get('/deleteall', async (req, res) => {
  try {
    await Promise.all([
      VerifiedUser.deleteMany({}),
      AuthAttempt.deleteMany({}),
    ]);
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
  } catch {
    res.status(500).json({ status: false, message: 'Error deleting data' });
  }
});

router.use(fireWall);

router.post('/sendotp', async (req, res) => {
  try {
    const r = await sendOtp(req);
    if (!r.status) return res.status(400).json(r);
    res.cookie('otpToken', r.token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: OTP_EXPIRY_TIME,
    });
    res.status(200).json({ status: true, message: 'OTP sent'  });
  } catch {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

router.post('/verifyotp', async (req, res) => {
  try {
    const r = await verifyOtp(req, res);
    if (!r.status) return res.status(400).json(r);
    res.status(200).json(r);
  } catch {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

module.exports = router;

(async () => {
  await Promise.all([VerifiedUser.deleteMany({}), AuthAttempt.deleteMany({})]);
})();
