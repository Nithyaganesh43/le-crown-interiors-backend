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

    const decoded = jwt.verify(token, process.env.PASSWORD);
    if (decoded.role !== 'admin' || decoded.username !== process.env.ADMIN) {
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        status: false, 
        message: 'Username and password are required' 
      });
    }

    if (username === process.env.ADMIN && password === process.env.PASSWORD) {
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.PASSWORD,
        { expiresIn: '2h' }
      );
      
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
      });
      
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
module.exports.login = login;
