const express = require('express');
const router = express.Router();
const { VerifiedUser, EstimationOrder, Chat, Subscribe, Contact } = require('../model/Model');
const { adminAuth } = require('../middleware/auth');
const mongoose = require('mongoose');

// Protect all routes
router.use(adminAuth);

// 1. Get all users (with optional filters)
router.get('/users', async (req, res) => {
  try {
    const { from, to, phoneNumber } = req.query;
    const filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    const users = await VerifiedUser.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 2. Get all estimation orders (with optional filters)
router.get('/estimation-orders', async (req, res) => {
  try {
    const { from, to, email } = req.query;
    const filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (email) filter['contact.email'] = email;
    const orders = await EstimationOrder.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch estimation orders' });
  }
});

// 3. Get all users' chat history (with optional filters)
router.get('/chats', async (req, res) => {
  try {
    const { user, from, to } = req.query;
    const filter = {};
    if (user) filter.user = user;
    if (from || to) {
      filter['chat.time'] = {};
      if (from) filter['chat.time'].$gte = new Date(from);
      if (to) filter['chat.time'].$lte = new Date(to);
    }
    const chats = await Chat.find(filter);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// 4. Get all subscriptions (with optional filters)
router.get('/subscriptions', async (req, res) => {
  try {
    const { from, to, email } = req.query;
    const filter = {};
    if (from || to) {
      filter.at = {};
      if (from) filter.at.$gte = new Date(from);
      if (to) filter.at.$lte = new Date(to);
    }
    if (email) filter.email = email;
    const subs = await Subscribe.find(filter).sort({ at: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

// 5. Get all contact info (with optional filters)
router.get('/contacts', async (req, res) => {
  try {
    const { from, to, phoneNumber } = req.query;
    const filter = {};
    if (from || to) {
      filter.at = {};
      if (from) filter.at.$gte = new Date(from);
      if (to) filter.at.$lte = new Date(to);
    }
    if (phoneNumber) filter.phoneNumber = phoneNumber;
    const contacts = await Contact.find(filter).sort({ at: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// 6. User registration over time (for graph)
router.get('/analytics/users-vs-time', async (req, res) => {
  try {
    const { interval = 'day', from, to } = req.query;
    const match = {};
    if (from || to) {
      match.createdAt = {};
      if (from) match.createdAt.$gte = new Date(from);
      if (to) match.createdAt.$lte = new Date(to);
    }
    const groupFormat = interval === 'month'
      ? { $dateToString: { format: '%Y-%m', date: '$createdAt' } }
      : { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    const data = await VerifiedUser.aggregate([
      { $match: match },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// 7. Estimation orders over time (for graph)
router.get('/analytics/estimation-orders-vs-time', async (req, res) => {
  try {
    const { interval = 'day', from, to } = req.query;
    const match = {};
    if (from || to) {
      match.createdAt = {};
      if (from) match.createdAt.$gte = new Date(from);
      if (to) match.createdAt.$lte = new Date(to);
    }
    const groupFormat = interval === 'month'
      ? { $dateToString: { format: '%Y-%m', date: '$createdAt' } }
      : { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    const data = await EstimationOrder.aggregate([
      { $match: match },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// 8. Subscriptions over time (for graph)
router.get('/analytics/subscriptions-vs-time', async (req, res) => {
  try {
    const { interval = 'day', from, to } = req.query;
    const match = {};
    if (from || to) {
      match.at = {};
      if (from) match.at.$gte = new Date(from);
      if (to) match.at.$lte = new Date(to);
    }
    const groupFormat = interval === 'month'
      ? { $dateToString: { format: '%Y-%m', date: '$at' } }
      : { $dateToString: { format: '%Y-%m-%d', date: '$at' } };
    const data = await Subscribe.aggregate([
      { $match: match },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// 9. Contacts over time (for graph)
router.get('/analytics/contacts-vs-time', async (req, res) => {
  try {
    const { interval = 'day', from, to } = req.query;
    const match = {};
    if (from || to) {
      match.at = {};
      if (from) match.at.$gte = new Date(from);
      if (to) match.at.$lte = new Date(to);
    }
    const groupFormat = interval === 'month'
      ? { $dateToString: { format: '%Y-%m', date: '$at' } }
      : { $dateToString: { format: '%Y-%m-%d', date: '$at' } };
    const data = await Contact.aggregate([
      { $match: match },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router; 