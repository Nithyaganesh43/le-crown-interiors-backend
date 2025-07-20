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
 
router.put('/updateEstimationStatus', async (req, res) => {
  try {
    const { EstimationOrderId, status } = req.body;
    const allowedStatuses = ['active', 'pending', 'completed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const result = await EstimationOrder.findByIdAndUpdate(
      EstimationOrderId,
      { $set: { status } },
      { new: true }
    );
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update estimation status' });
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

router.get('/getDashboard', async (req, res) => {
  try { 
    const estimationAgg = await EstimationOrder.aggregate([
      {
        $group: {
          _id: null,
          totalEstimations: { $sum: 1 },
          totalEstimationValue: {
            $sum: {
              $toInt: "$EstimationAmount"
            }
          }
        }
      }
    ]);
    const totalEstimations = estimationAgg[0]?.totalEstimations || 0;
    const totalEstimationValue = estimationAgg[0]?.totalEstimationValue || 0;
 
    const totalUsers = await VerifiedUser.countDocuments();
 
    const contactQueries = await Contact.countDocuments();

    res.json({
      totalEstimations,
      totalEstimationValue,
      totalUsers,
      contactQueries
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard data', details: err.message });
  }
});

module.exports = router;
