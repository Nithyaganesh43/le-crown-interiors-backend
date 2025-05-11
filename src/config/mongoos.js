const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI + '?retryWrites=true&w=majority',
      {
        serverSelectionTimeoutMS: 30000,
      }
    );
    
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

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  }
};

module.exports = connectToDb;
 
