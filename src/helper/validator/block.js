const { AuthAttempt } = require('../../model/Model');

exports.block = async function (reason, fingerprint, res) {
  await AuthAttempt.updateOne(
    { deviceId: fingerprint },
    {
      $set: {
        isBlocked: true,
        blockedAt: new Date(),
        reasonForBlocked: reason,
      },
    },
    { upsert: true }
  );
  res.status(403).json({ status: false, message: 'Access denied' });
}; 
 