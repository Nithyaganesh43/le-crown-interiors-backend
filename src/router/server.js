require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const serverInit = express.Router();

const allowedOrigins = [
  'https://admin-le-crown.vercel.app',
  'http://127.0.0.1:5500',
  'http://localhost:5173',
];

serverInit.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

serverInit.use(cookieParser());
serverInit.use(express.json());

// Test route
serverInit.get('/ping', (req, res) => {
  res.send('Pong from le-crowninteriors Server');
});

// Admin-only middleware
const adminAuth = async (req, res, next) => {
  try {
    const userToken = req.cookies?.authToken;
    if (!userToken) throw new Error('Token missing');
    const decoded = jwt.verify(userToken, process.env.PASSWORD);
    const { role, password } = decoded;
    if (role === 'admin' && password === process.env.PASSWORD) {
      next();
    } else {
      res.status(403).json({ status: false, message: 'Forbidden - Not admin' });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: 'Authentication failed' });
  }
};
 

// Login route
serverInit.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN && password === process.env.PASSWORD) {
    const token = jwt.sign({ username, role: 'admin', password: process.env.PASSWORD }, process.env.PASSWORD);
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.json({ status: true, message: 'Login successful' });
  } else {
    res.status(401).json({ status: false, message: 'Invalid username or password' });
  }
});

module.exports = serverInit;
