const express = require('express');
const router = express.Router();
const fireWall = require('../middleware/fireWall');
const { sendOtp, verifyOtp, clearOtpDataBase } = require('../util/otpHelper'); 

router.get('/deleteall', async (req, res) => {
  try {
    await clearOtpDataBase(res);
    res.json({ status: true, message: 'All data deleted' });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Error deleting data' });
  }
});

router.use(fireWall);

router.post('/sendotp', async (req, res) => {
  try {
    const { phoneNumber, fingerprint } = req.body;
    const status = await sendOtp(phoneNumber, fingerprint);
    if (!status.status) return res.status(400).json(status); 
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

router.post('/verifyotp', async (req, res) => {
  try {
    const { userOtp, fingerprint } = req.body;
    const status = await verifyOtp(userOtp, fingerprint);
    if (!status.status) return res.status(400).json(status);
   
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ status: false, message: 'Internal error' });
  }
});

module.exports = router;
