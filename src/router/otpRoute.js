const express = require('express');
const router = express.Router();
const fireWall = require('../middleware/fireWall');
const { sendOtp, verifyOtp } = require('../util/otpHelper');
const jwt = require('jsonwebtoken');
const { VerifiedUser, AuthAttempt } = require('../model/Model');

router.get('/deleteall', async (req, res) => {
  try {
    await VerifiedUser.deleteMany({});
    await AuthAttempt.deleteMany({});
    res.json({ status: true, message: 'All data deleted' });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Error deleting data' });
  }
});

router.use(fireWall);

router.post('/sendotp', async (req, res) => {
  try {
    const { phoneNumber, fingerprint } = req.body;
    if (!phoneNumber)
      return res
        .status(400)
        .json({ status: false, message: 'Phone number is missing' });

    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.PASSWORD);
        if (decoded.verifiedClient) {
          return res.status(200).json({
            status: true,
            message:
              'Authorized, check WhatsApp: ends with ' +
              decoded.verifiedClient.slice(-3),
          });
        }
      } catch (e) {
        // token exists but invalid, proceed to send OTP
      }
    }

    const status = await sendOtp(phoneNumber, fingerprint);
    if (!status.status) return res.status(400).json(status);

    const tempToken = jwt.sign({ phoneNumber }, process.env.PASSWORD, {
      expiresIn: '5m',
    });
    res.cookie('token', tempToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    });

    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

router.post('/verifyotp', async (req, res) => {
  try {
    const { userOtp, fingerprint } = req.body;
    const token = req.cookies.token;
    if (!token)
      return res
        .status(400)
        .json({ status: false, message: 'Token not found' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.PASSWORD);
    } catch {
      return res
        .status(400)
        .json({ status: false, message: 'Invalid or expired token' });
    }

    const phoneNumber = decoded.phoneNumber;
    const status = await verifyOtp(phoneNumber, userOtp, fingerprint);
    if (!status.status) return res.status(400).json(status);

    const authToken = jwt.sign(
      { verifiedClient: phoneNumber },
      process.env.PASSWORD,
      {
        expiresIn: '365d',
      }
    );

    res.cookie('token', authToken, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None',
    });

    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

module.exports = router;
