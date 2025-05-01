const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { uploadImg, deleteImg } = require('../util/cloudinary')
const Image = require('../model/image');

const upload = multer({ storage: multer.memoryStorage() });

const auth = (req, res, next) => {
  next();
  
};

router.post('/upload',auth, upload.single('img'), async (req, res) => {
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
    res.json(image);
  } catch (e) {
    res.status(500).send(`Upload failed: ${e}`);
  }
});

router.delete('/delete',auth, async (req, res) => {
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

router.post('/all', auth, async (req, res) => {
  const data = await Image.aggregate([
    { $sort: { createdAt: -1 } },
    { $group: { _id: '$folderName', doc: { $first: '$$ROOT' } } },
  ]);
  const result = {};
  data.forEach((d) => {
    result[d._id] = {
      imgData: d.doc.img,
      name: d.doc.name,
      title: d.doc.title,
      content: d.doc.content,
      description: d.doc.description,
    };
  });
  res.json(result);
});


module.exports = router;
