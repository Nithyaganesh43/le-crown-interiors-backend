const mongoose = require('mongoose');

// Image Schema
const ImageSchema = new mongoose.Schema(
  {
    folderName: { type: String },
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
  },
  { timestamps: true }
);

// Verified User Schema
const VerifiedUserSchema = new mongoose.Schema(
  {
    fingerprint: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

// Auth Attempt Schema
const AuthAttemptSchema = new mongoose.Schema(
  {
    fingerprint: { type: String, required: true },
    phoneNumber: { type: String },
    failedAttempts: { type: Number, default: 0 },
    lastAttemptToSendOtp: { type: Date, default: Date.now },
    NoAttemptToVerifyOtp: { type: Number, default: 0 },
    reasonForBlocked: { type: String },
    isBlocked: { type: Boolean, default: false },
    blockedAt: { type: Date },
    pendingOtp: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    chat: {
      type: [messageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Export all models
module.exports = {
  VerifiedUser: mongoose.model('VerifiedUser', VerifiedUserSchema),
  AuthAttempt: mongoose.model('AuthAttempt', AuthAttemptSchema),
  Chat: mongoose.model('Chat', chatSchema),
  Image: mongoose.model('Image', ImageSchema),
};
