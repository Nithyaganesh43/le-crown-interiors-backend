const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  caption: String,
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  publishAt: Date,
  published: { type: Boolean, default: false },
});
module.exports = mongoose.model('Post', postSchema);
