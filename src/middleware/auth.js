const auth = require('express').Router();

module.exports = auth.use(async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    if (token == process.env.PASSWORD + process.env.PASSWORD) next();
    else {
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
    }
  } catch {
    res.status(500).json({ status: false, message: 'Error deleting data' });
  }
});
