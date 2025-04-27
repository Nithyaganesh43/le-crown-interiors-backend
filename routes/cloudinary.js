const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const dataFilePath = path.join(__dirname, '../data/imageURLs.json');

const readData = () => {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
  }
  return {};
};

const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

router.use((req, res, next) => {
  if (req.body.PASSWORD === process.env.PASSWORD) {
    next();
  } else {
    res.status(403).send('Access Denied');
  }
});

router.post('/upload', async (req, res) => {
  const folder = req.body.folder;
  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];
  const urls = [];

  for (const file of files) {
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
    });
    urls.push(uploadResponse.secure_url);

    const data = readData();
    if (!data[folder]) data[folder] = [];
    data[folder].push(uploadResponse.secure_url);
    saveData(data);
  }

  res.json({ urls });
});

router.get('/all', (req, res) => {
  const data = readData();
  res.json(data);
});

router.get('/list', async (req, res) => {
  const folder = req.query.folder;
  const result = await cloudinary.search
    .expression(`folder:${folder}/*`)
    .max_results(100)
    .execute();
  const urls = result.resources.map((img) => img.secure_url);

  const data = readData();
  data[folder] = urls;
  saveData(data);

  res.json({ urls });
});

router.delete('/delete', async (req, res) => {
  const public_id = req.body.public_id;

  await cloudinary.uploader.destroy(public_id);

  const data = readData();
  for (const folder in data) {
    data[folder] = data[folder].filter((url) => !url.includes(public_id));
  }
  saveData(data);

  res.json({ msg: 'Image deleted' });
});

router.delete('/delete-folder', async (req, res) => {
  const folder = req.body.folder;

  await cloudinary.api.delete_resources_by_prefix(folder + '/');
  await cloudinary.api.delete_folder(folder);

  const data = readData();
  delete data[folder];
  saveData(data);

  res.json({ msg: 'Folder deleted' });
});

module.exports = router;
