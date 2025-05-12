const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Post = require('../model/post');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

router.post('/signup', async (req, res) => {
  let u = new User({ username: req.body.username });
  await u.save();
  res.send(u);
});

router.post('/follow', async (req, res) => {
  let a = await User.findById(req.body.me);
  let b = await User.findById(req.body.other);
  if (!b.followers.includes(a._id)) b.followers.push(a._id);
  await b.save();
  res.send(b);
});

router.get('/posts', async (req, res) => {
  let posts = await Post.find({ published: true }).populate('user', 'username');
  res.send(posts);
});

router.post('/like', async (req, res) => {
  let p = await Post.findById(req.body.postId);
  let i = p.likes.indexOf(req.body.userId);
  if (i == -1) p.likes.push(req.body.userId);
  else p.likes.splice(i, 1);
  await p.save();
  res.send(p);
});

router.post('/post', upload.single('image'), async (req, res) => {
  let imgPath = req.file.path;
  let imgData = fs.readFileSync(imgPath).toString('base64');
  fs.unlinkSync(imgPath);
  let p = new Post({
    user: req.body.userId,
    caption: req.body.caption,
    image: imgData,
    publishAt: new Date(req.body.time),
  });
  await p.save();
  let now = Date.now(),
    pub = new Date(req.body.time).getTime();
  if (pub > now) {
    setTimeout(async () => {
      let x = await Post.findById(p._id);
      x.published = true;
      await x.save();
    }, pub - now);
  } else {
    p.published = true;
    await p.save();
  }
  res.send(p);
});

router.post('/notify', async (req, res) => {
  res.send({ ok: true });
});

module.exports = router;
