require('dotenv').config();
const express = require('express');
const serverInit = express.Router();
const cors = require('cors');
const allowedOrigins = ['https://admin.le-crowninteriors.com'];
serverInit.use(cors({ origin: allowedOrigins }));

serverInit.get('/ping', async (req, res) => { 
  res.send('Pong from le-crowninteriors Server');
});
module.exports = serverInit;
