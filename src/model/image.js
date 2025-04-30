const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    folderName: { type: String  },
    img: {
      public_id: { type: String },
      url: { type: String },
      dimentions: {
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

module.exports = mongoose.model('Image', imageSchema);
