const express = require('express');
const r = express.Router();
const { User, rentRequest } = require('../model/tempModel');

r.post('/add-user', async (req, res) => {
  try {
    let u = await User.findOne({ phonenumber: req.body.phonenumber });
    if (!u) {
      u = await User.create(req.body);
      return res.json({ msg: 'created', user: u });
    }
    if (u.password === req.body.password) return res.json({ msg: 'ok' });
    res.json({ msg: 'wrong password' });
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

r.post('/rentrequest', async (req, res) => {
  try {
    const data = await rentRequest.create(req.body);
    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});
  

r.post('/trackrequest', async (req, res) => {
  try {
    const data = await rentRequest.findById(req.body._id);
    if (!data) return res.status(404).json({ msg: 'not found' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

r.post('/getrequests', async (req, res) => {
  try {
    const data = await rentRequest.find({});
    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});


r.post('/respondrequests', async (req, res) => {
  try {
    const data = await rentRequest.findByIdAndUpdate(
      req.body._id,
      { status: req.body.response },
      { new: true }
    );
    if (!data) return res.status(404).json({ msg: 'not found' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

module.exports = r;

 