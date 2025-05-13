module.exports = function inputCheck(req, res, next) {
  const { userOtp, phoneNumber } = req.body;

  if (userOtp && !/^\d{4}$/.test(userOtp)) {
    return res
      .status(400)
      .json({ status: false, message: 'Invalid OTP format' });
  }
  if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
    return res
      .status(400)
      .json({ status: false, message: 'Invalid phone number format' });
  } 
  next();
};
