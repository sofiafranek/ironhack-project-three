'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountNumber: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Savings', 'Current', 'Credit']
  },
  balance: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Account', schema);
