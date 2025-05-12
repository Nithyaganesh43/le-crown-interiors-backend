const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const Post = require('../model/post');

// create user
router.post('/signup', async (req, res) => {
  let u = new User({ username: req.body.username });
  await u.save();
  res.send(u);
});

// follow
router.post('/follow', async (req, res) => {
  let a = await User.findById(req.body.me);
  let b = await User.findById(req.body.other);
  if (!b.followers.includes(a._id)) b.followers.push(a._id);
  await b.save();
  res.send(b);
});

// get all posts
router.get('/posts', async (req, res) => {
  let posts = await Post.find({ published: true }).populate('user', 'username');
  res.send(posts);
});

// like post
router.post('/like', async (req, res) => {
  let p = await Post.findById(req.body.postId);
  if (!p.likes.includes(req.body.userId)) p.likes.push(req.body.userId);
  await p.save();
  res.send(p);
});

// create post with schedule
router.post('/post', async (req, res) => {
  let p = new Post({
    user: req.body.userId,
    caption: req.body.caption,
    image: req.body.image,
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
      console.log('Post published:', x.caption);
    }, pub - now);
  } else {
    p.published = true;
    await p.save();
  }
  res.send(p);
});

// dummy notify
router.post('/notify', async (req, res) => {
  console.log('Notify to:', req.body.userId, req.body.msg);
  res.send({ ok: true });
});

module.exports = router;
  