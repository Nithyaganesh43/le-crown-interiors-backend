const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config();

router.post('/upload', async (req, res) => {
  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];
  const folder = req.body.folder;
  let urls = [];
  for (const file of files) {
    let r = await cloudinary.uploader.upload(file.tempFilePath, { folder });
    urls.push({ url: r.secure_url, public_id: r.public_id });
  }
  res.json({ urls });
});

router.get('/list', async (req, res) => {
  const folder = req.query.folder;
  let r = await cloudinary.search
    .expression(`folder:${folder}/*`)
    .max_results(100)
    .execute();
  let urls = r.resources.map((img) => ({
    url: img.secure_url,
    public_id: img.public_id,
  }));
  res.json({ urls });
});

router.delete('/delete', async (req, res) => {
  const public_id = req.body.public_id;
  await cloudinary.uploader.destroy(public_id);
  res.json({ msg: 'Deleted' });
});

router.delete('/delete-folder', async (req, res) => {
  const folder = req.body.folder;
  await cloudinary.api.delete_resources_by_prefix(folder + '/');
  await cloudinary.api.delete_folder(folder);
  res.json({ msg: 'Folder Deleted' });
});

module.exports = router;
