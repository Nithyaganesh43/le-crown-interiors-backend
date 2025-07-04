const { subscribe } = require('diagnostics_channel');
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
const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  at: {
    type: Date,
    default: Date.now,
  },
});
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  help: { type: String, required: true },
  discription: { type: String, required: true },
  at: {
    type: Date,
    default: Date.now,
  },
});

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  }
});

const contactSchema2 = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const estimationOrderSchema = new mongoose.Schema(
  {
    rooms: {
      type: [roomSchema],
      validate: [arrayLimit, '{PATH} exceeds the limit of 100 rooms'],
    },
    wood: {
      type: String,
      required: true,
    },
    hardware: {
      type: String,
      required: true,
    },
    workmanship: {
      type: String,
      required: true,
    },
    surfaceFinish: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    additional: {
      type: [String],
      default: [],
    },
    contact: {
      type: contactSchema2,
      required: true,
    },
    EstimationAmount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,   
  }
);

function arrayLimit(val) {
  return val.length <= 100;
}
 
// Export all models
module.exports = {
  VerifiedUser: mongoose.model('VerifiedUser', VerifiedUserSchema),
  AuthAttempt: mongoose.model('AuthAttempt', AuthAttemptSchema),
  Chat: mongoose.model('Chat', chatSchema),
  Image: mongoose.model('Image', ImageSchema),
  Subscribe: mongoose.model('Subscribe', subscriptionSchema),
  Contact: mongoose.model('Contact', contactSchema),
  EstimationOrder: mongoose.model('EstimationOrder', estimationOrderSchema),
};
