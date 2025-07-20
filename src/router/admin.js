const express = require('express');
const router = express.Router();
const { VerifiedUser, EstimationOrder,  Subscribe, Contact } = require('../model/Model');
const { adminAuth, adminLogin } = require('../middleware/auth'); 

router.post('/login', adminLogin);

router.use(adminAuth);

router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await VerifiedUser.find({}).sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/getAllEstimationOrders', async (req, res) => {
  try {
    const orders = await EstimationOrder.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ error: 'Failed to fetch estimation orders' });
  }
});
 
router.get('/getAllSubscriptions', async (req, res) => {
  try {
    const subs = await Subscribe.find({}).sort({ at: -1 });
    res.json(subs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

router.get('/getAllContacts', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ at: -1 });
    res.json(contacts);
  } catch {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}); 

module.exports = router;
