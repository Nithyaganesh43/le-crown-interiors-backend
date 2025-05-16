const express = require('express');
const r = express.Router();
const { User, rentRequest } = require('../model/tempModel');

r.post('/add-user', async (req, res) => {
  try {
    let { phonenumber, password } = req.body;
    let u = await User.findOne({ phonenumber });
    if (!u) {
      u = await User.create(req.body);
      return res.json({
        msg: 'created',
        user: { _id: u._id, phonenumber: u.phonenumber, password: u.password },
      });
    }
    if (u.password === password)
      return res.json({
        msg: 'ok',
        user: { _id: u._id, phonenumber: u.phonenumber, password: u.password },
      });
    res.json({ msg: 'wrong password' });
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

r.post('/rentrequest', async (req, res) => {
  try {
    let { phonenumber, name, title, content, description, img } = req.body;
    let d = await rentRequest.create({
      phonenumber,
      name,
      title,
      content,
      description,
      img,
    });
    let { _id, status } = d;
    let {
      public_id,
      url,
      dimensions: { width, height },
    } = img;
    res.json({
      _id,
      phonenumber,
      name,
      title,
      content,
      description,
      status,
      img: { public_id, url, dimensions: { width, height } },
    });
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

r.post('/trackrequest', async (req, res) => {
  try {
    let { _id } = req.body;
    let d = await rentRequest.findById(_id);
    if (!d) return res.status(404).json({ msg: 'not found' });
    let { phonenumber, name, title, content, description, status, img } = d;
    let {
      public_id,
      url,
      dimensions: { width, height },
    } = img;
    res.json({
      _id,
      phonenumber,
      name,
      title,
      content,
      description,
      status,
      img: { public_id, url, dimensions: { width, height } },
    });
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

r.post('/getrequests', async (req, res) => {
  try {
    let arr = await rentRequest.find({});
    let d = arr.map((x) => {
      let { _id, phonenumber, name, title, content, description, status, img } =
        x;
      let {
        public_id,
        url,
        dimensions: { width, height },
      } = img;
      return {
        _id,
        phonenumber,
        name,
        title,
        content,
        description,
        status,
        img: { public_id, url, dimensions: { width, height } },
      };
    });
    res.json(d);
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

module.exports = r;
