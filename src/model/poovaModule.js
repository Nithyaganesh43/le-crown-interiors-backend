const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phonenumber: String,
  password: String,
});

const rentRequestSchema = new mongoose.Schema({
  phonenumber: String,
  img: {
    public_id: String,
    url: String,
    dimensions: {
      width: Number,
      height: Number,
    },
  },
  name: String,
  title: String,
  content: String,
  description: String,
  status: { type: String, default: 'pending' },
});

const User = mongoose.model('Useraa', userSchema);
const rentRequest = mongoose.model('rentRequestaa', rentRequestSchema);

module.exports = { User, rentRequest };
