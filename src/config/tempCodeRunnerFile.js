
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://lecrowninteriors:SY7RfFAGTkC5aozK@lecrowninteriors.epaamtp.mongodb.net/lecrowninteriors'
);

const conn = mongoose.connection;

conn.once('open', async () => {
  try {
    await conn.collection('verifiedusers').dropIndex('deviceId_1');
    console.log('✅ Index deviceId_1 dropped successfully');
  } catch (err) {
    console.error('❌ Error dropping index:', err.message);
  } finally {
    conn.close();
  }
});
