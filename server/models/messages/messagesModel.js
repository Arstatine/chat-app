const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('Messages', messageSchema);
