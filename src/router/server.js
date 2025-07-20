require('dotenv').config();
const express = require('express'); 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const serverInit = express.Router();

serverInit.use(cookieParser());
serverInit.use(express.json());

const allowedOrigins = [
  'https://admin-le-crown.vercel.app',
  'http://127.0.0.1:5500',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://192.168.1.4:5173',
  'https://le-crown-interiors-admin.vercel.app'
];

serverInit.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

serverInit.get('/ping', async (req, res) => {
  res.send('Pong from le-crowninteriors Server');
});

module.exports = serverInit;
