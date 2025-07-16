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


const adminAuth = async (req, res, next) => {
  try {
    console.log("Auth Debug - Cookies Received:", req.cookies);
    const userToken = req.cookies?.authToken;
    if (!userToken) throw new Error('Token missing');

    const decoded = jwt.verify(userToken, process.env.PASSWORD);
    const { role, password } = decoded;

    if (role === 'admin' && password === process.env.PASSWORD) {
      next();
    } else {
      res.status(403).send('Admin access required');
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN && password === process.env.PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin', password: process.env.PASSWORD },
      process.env.PASSWORD
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.json({ status: true, message: 'Login successful' });
  } else {
    res.status(401).json({ status: false, message: 'Invalid username or password' });
  }
};

module.exports.adminAuth = adminAuth;
module.exports.login = login;
