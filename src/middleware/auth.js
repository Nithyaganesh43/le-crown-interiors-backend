const auth = require('express').Router();
const jwt = require('jsonwebtoken');

module.exports = auth.use(async (req, res, next) => {
  try {
    const userToken = req.cookies?.authToken;

    if (!userToken) {
      throw new Error('Token missing');
    }

    const decoded = jwt.verify(userToken, process.env.PASSWORD);  

    const { user, token } = decoded;  

    if (token === process.env.PASSWORD) {
      req.user = user;
      next();
    } else { 
      res.status(401).send('Login to continue');
    }
  } catch (err) {
    res.status(500).json({ status: false, message: 'Authentication failed' });

  }
});
