const browserCheck = require('../helper/validator/browserCheck');
const inputCheck = require('../helper/validator/inputCheck');
const verificationCheck = require('../helper/validator/verificationCheck');
const attemptCheck = require('../helper/validator/attemptCheck');

module.exports = async function validator(req, res, next) {
  try {
    const { userOtp, phoneNumber, fingerprint } = req.body;

    await browserCheck(req, fingerprint, res);

    inputCheck(userOtp, phoneNumber);

    await verificationCheck(phoneNumber, fingerprint, res);

    await attemptCheck({ fingerprint, phoneNumber, userOtp }, res);

    next();
    
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
