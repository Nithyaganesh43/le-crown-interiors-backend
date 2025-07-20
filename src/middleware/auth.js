const auth = require('express').Router();
const jwt = require('jsonwebtoken');



module.exports = auth.use(async (req, res, next) => {
  try {
    const userToken = req.cookies?.authToken;

    if (!userToken) {
      throw new Error('Token missing');
    }

    const decoded = jwt.verify(userToken, process.env.PASSWORD);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ 
      status: false, 
      message: err.message || 'Authentication failed' 
    });
  }
}); 


const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: false, 
        message: 'Authorization header missing or invalid' 
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        status: false, 
        message: 'Token missing' 
      });
    }

    const {username,password } = jwt.verify(token, process.env.PASSWORD);
    if (username !== "admin" && password !== "admin@123") { 
      return res.status(403).json({ 
        status: false, 
        message: 'Admin access required' 
      });
    } 
    next();
  } catch (err) {
    res.status(401).json({ 
      status: false, 
      message: 'Invalid or expired token' 
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        status: false, 
        message: 'Username and password are required' 
      });
    }

    // if (username === "process.env.ADMIN" && password === process.env.PASSWORD) {
      if (username === "admin" && password === "admin@123") { 
        
      const token = jwt.sign(
        { username,password },
        process.env.PASSWORD,
        { expiresIn: '7d' }
      );
       
      res.json({ status: true, message: 'Login successful', token });
    } else {
      res.status(401).json({ status: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ 
      status: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports.adminAuth = adminAuth;
module.exports.adminLogin = adminLogin;
