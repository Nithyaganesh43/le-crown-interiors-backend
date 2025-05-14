const { VerifiedUser } = require('../../model/Model');
const jwt = require('jsonwebtoken');

module.exports = async function verificationCheck(req, res, next) {
  const { phoneNumber, fingerprint } = req.body;

  if (!phoneNumber) return next();

  const user = await VerifiedUser.findOne({});
  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.PASSWORD);
      if (decoded.verifiedClient) {
        res.status(200).json({
          status: true,
          message:
            'This device is already authorized with the number *******' +
            decoded.verifiedClient.slice(-4),
        });
        return;
      }
    } catch (e) {}
  }

  user.forEach((element) => {
    if (element.phoneNumber == phoneNumber) {
      res.status(200).json({
        status: true,
        message: 'This number is already verified. Check your WhatsApp',
      });
      return;
    }
    if (element.deviceId == fingerprint) {
      res.status(200).json({
        status: true,
        message:
          'This device is already authorized with the number *******' +
          decoded.verifiedClient.slice(-4),
      });
      return;
    }
  });

  next();
};
