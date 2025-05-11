const mongoose = require('mongoose');

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
const VerifiedUserSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true, index: true },
  },
  { timestamps: true }
);

const AuthAttemptSchema = new mongoose.Schema(
  {
    deviceId: { type: String, unique: true, required: true },
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

module.exports = {
  VerifiedUser: mongoose.model('VerifiedUser', VerifiedUserSchema),
  AuthAttempt: mongoose.model('AuthAttempt', AuthAttemptSchema),
  
  Image: mongoose.model('Image', ImageSchema),
};
