const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { uploadImg, deleteImg } = require('../util/cloudinary');
const {Image }= require('../model/Model');
const upload = multer({ storage: multer.memoryStorage() });
const validator = require('../util/validation');
let allData;

router.get('/all', async (req, res) => {
  res.json(allData);
});

router.get('/folder/:folderName', (req, res) => {
  const { folderName } = req.params;
  const folderImages = allData?.[folderName];

  if (!folderImages) {
    return res.status(404).json({
      status: false,
      message: `Folder "${folderName}" not found`,
    });
  }

  res.json(folderImages);
});


const auth = (req, res, next) => {
  if (req.body?.PASSWORD === process.env.PASSWORD) return next();
  res.status(400).send('Access Denied');
};

router.post('/upload', upload.single('img'), auth, async (req, res) => {
  const errors = validator.uploadValidation(req);
  if (errors.length) return res.status(400).json({ status: false, errors });
  try {
    const { name, title, content, description, folderName } = req.body;
    const dir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const tmpPath = path.join(dir, req.file.originalname);
    fs.writeFileSync(tmpPath, req.file.buffer);
    const data = await uploadImg(tmpPath);
    fs.unlinkSync(tmpPath);
    const image = new Image({
      folderName,
      img: data,
      name,
      title,
      content,
      description,
    });
    await image.save();
    await updateAllData();
    res.json(image);
  } catch (e) {
    res.status(500).send(`Upload failed: ${e}`);
  }
});

router.delete('/delete', auth, async (req, res) => {
  const errors = validator.deleteValidation(req);
  if (errors.length) return res.status(400).json({ status: false, errors });
  try {
    const public_id = req.body.public_id;
    if (!public_id)
      return res
        .status(400)
        .json({ status: false, message: 'public_id is required' });

        
    const del = await Image.deleteOne({ 'img.public_id': public_id });
    if (del.deletedCount === 0)
      return res
        .status(404)
        .json({ status: false, message: 'Image not found' });
    await updateAllData();
    const cloud = await deleteImg(public_id);
    if (cloud.result !== 'ok')
      return res
        .status(500)
        .json({
          status: false,
          message: 'Cloudinary deletion failed',
          error: cloud,
        });
    res.json({ status: true, message: 'Image deleted' });
  } catch (e) {
    res
      .status(500)
      .json({ status: false, message: `Delete failed: ${e.message}` });
  }
});

router.post('/update', auth, async (req, res) => {
  const errors = validator.updateValidation(req);
  if (errors.length) return res.status(400).json({ status: false, errors });
  try {
    const { name, title, content, description, folderName, public_id } =
      req.body;
    const info = await Image.updateOne(
      { 'img.public_id': public_id },
      { folderName, name, title, content, description }
    );
    if (!info.acknowledged || info.modifiedCount === 0)
      return res.status(500).json({
        status: false,
        message: 'Updation failed',
        error: info,
      });
    await updateAllData();
    res.json({ status: true, message: 'Image updated' });
  } catch (e) {
    res
      .status(500)
      .json({ status: false, message: `Update failed: ${e.message}` });
  }
});


async function updateAllData() {
  const data = await Image.aggregate([
    { $sort: { createdAt: -1 } },
    { $group: { _id: '$folderName', images: { $push: '$$ROOT' } } },
  ]);
  const result = {};
  data.forEach((d) => {
    result[d._id] = d.images.map((x) => ({
      img: x.img,
      name: x.name,
      title: x.title,
      content: x.content,
      description: x.description,
    }));
  });
  allData = result;
}

(async () => {
  await updateAllData();
})();

module.exports = router;
