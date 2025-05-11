const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI + '?retryWrites=true&w=majority',
      {
        serverSelectionTimeoutMS: 30000,
      }
    );
    
 

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  }
};

module.exports = connectToDb;
 
const mongoose = require('mongoose');

(async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI + '?retryWrites=true&w=majority'
    );

    const collection = mongoose.connection.collection('verifiedusers');
    const indexes = await collection.indexes();

    if (indexes.some((i) => i.name === 'deviceId_1')) {
      await collection.dropIndex('deviceId_1');
      console.log('✅ Index deviceId_1 dropped successfully');
    } else {
      console.log('ℹ️ Index deviceId_1 does not exist');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
