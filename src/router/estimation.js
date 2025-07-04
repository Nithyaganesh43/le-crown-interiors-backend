const express = require('express');
const router = express.Router();
const { EstimationOrder } = require('../model/Model');
const validation = require('../util/validation');

const auth = (req, res, next) => {
  if (req.body?.PASSWORD === process.env.PASSWORD) return next();
  res.status(400).send('Access Denied');
};

// GET all estimation orders
router.get('/',auth, async (req, res) => {
  try {
    const orders = await EstimationOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch estimation orders' });
  }
});

// POST a new estimation order
router.post('/', async (req, res) => {
  try {
    const data = req.body; 
    const errors = validation.estimationOrderValidation(data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } 
    const order = new EstimationOrder(data);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create estimation order', details: err.message });
  }
});

module.exports = router; 