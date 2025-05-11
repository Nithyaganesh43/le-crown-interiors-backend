const express = require('express');
const router = express.Router();
const fireWall = require('../middleware/beforeAuth');
const { sendOtp, verifyOtp } = require('../util/otpHelper');
const jwt = require('jsonwebtoken');

router.post('/sendotp', fireWall, async (req, res) => {
  console.log(req.body);
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res
      .status(400)
      .json({ status: false, message: 'Phone number is missing' });
  }

  const status = await sendOtp(phoneNumber);

  if (status.status) {
    const token = jwt.sign({ phoneNumber }, process.env.PASSWORD, {
      expiresIn: '5m',
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,  
      secure: true,  
      sameSite: 'None',  
    });

    res.status(200).json(status);
  } else {
    res.status(400).json(status);
  }
});

router.post('/verifyotp', async (req, res) => {
  const { userOtp } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ status: false, message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.PASSWORD);
    const phoneNumber = decoded.phoneNumber;

    const status = await verifyOtp(phoneNumber, userOtp);

    if (status.status) {
      res.status(200).json(status);
    } else {
      res.status(400).json(status);
    }
  } catch (error) {
    res
      .status(400)
      .json({
        status: false,
        message: 'Invalid token or OTP verification failed',
      });
  }
});

module.exports = router;
