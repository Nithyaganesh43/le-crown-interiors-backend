require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const serverInit = express.Router();
const cors = require('cors');

const allowedOrigins = [
  'https://admin.le-crowninteriors.com',
  'http://127.0.0.1:5500',
  'http://localhost:5173',
];

serverInit.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || true) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

serverInit.use(cookieParser());
serverInit.use(express.json());

serverInit.get('/ping', async (req, res) => {
  res.send('Pong from le-crowninteriors Server');
});
global.CONFIG_FILE_PATH = path.join(__dirname, 'config.json');

global.Config = {
  load() {
    try {
      const raw = fs.readFileSync(global.CONFIG_FILE_PATH, 'utf8');
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },
  get(key) {
    const config = this.load();
    return config[key];
  },
  setMany(newData) {
    const config = this.load();
    const updated = { ...config, ...newData };
    fs.writeFileSync(global.CONFIG_FILE_PATH, JSON.stringify(updated, null, 2));
  },
};

serverInit.post('/update-env', (req, res) => {
  const { PASSWORD, env } = req.body;

  if (
    PASSWORD !==
    process.env.PASSWORD + process.env.PASSWORD + process.env.PASSWORD
  ) {
    return res.status(404).send("Not Found");
  }

  if (typeof env !== 'object' || Array.isArray(env)) {
    return res.status(400).json({ error: 'Invalid "env" format' });
  }

  global.Config.setMany(env);
  res.json({ success: true, updatedKeys: Object.keys(env) });
});


module.exports = serverInit;
