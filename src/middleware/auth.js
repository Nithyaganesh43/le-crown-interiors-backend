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
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ status: false, message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) return res.status(401).json({ status: false, message: 'Token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' || decoded.username !== process.env.ADMIN)
      return res.status(403).json({ status: false, message: 'Admin access required' });

    next();
  } catch (err) {
    res.status(401).json({ status: false, message: 'Invalid or expired token' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN && password === process.env.PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ status: true, message: 'Login successful', token });
  } else {
    res.status(401).json({ status: false, message: 'Invalid username or password' });
  }
};

module.exports.adminAuth = adminAuth;
module.exports.login = login;
