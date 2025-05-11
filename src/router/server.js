require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const serverInit = express.Router();
const allowedOrigins = ['https://admin.le-crowninteriors.com'];

app.use(cookieParser());
app.use(express.json());
serverInit.use(cors({ origin: allowedOrigins }));

serverInit.get('/ping', async (req, res) => {
  res.send('Pong from le-crowninteriors Server');
});

module.exports = serverInit;
