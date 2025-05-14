const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://kirubha:123456789kirubha@kirubha.whw7qlk.mongodb.net' +
        '?retryWrites=true&w=majority',
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
  
 