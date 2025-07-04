 
const https = require('https');
require('dotenv').config();

const data = JSON.stringify({
  PASSWORD: process.env.PASSWORD + process.env.PASSWORD + process.env.PASSWORD,
  env: {
    OPEN_AI_KEY: process.env.OPEN_AI_API_KEY
  }
});

const options = {
  hostname: 'le-crown-interiors-backend.onrender.com',
  path: '/update-env',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let response = '';

  res.on('data', (chunk) => {
    response += chunk;
  });

  res.on('end', () => {
    console.log('Response:', response);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
