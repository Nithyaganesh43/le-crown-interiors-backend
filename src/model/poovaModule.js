const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({ 
  phonenumber : String,
  password: String,
});

const rentRequestSchema = new mongoose.Schema({
  phonenumber: String,
  img: {
    public_id: { type: String },
    url: { type: String },
    dimensions: {
      width: { type: Number },
      height: { type: Number },
    },
  },
  name: { type: String },
  title: { type: String },
  content: { type: String },
  description: { type: String },
  status: {type: String , default:"pending"} 
});
 
const User = mongoose.model('Puser', userSchema);
const rentRequest = mongoose.model('PrentRequest', rentRequestSchema);

module.exports = { User, rentRequest };
