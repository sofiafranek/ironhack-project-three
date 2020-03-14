'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountIDTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  accountIDFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  totalAmount: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reference:{
    type: String
  },
  endPoint: {
    type: String
  }
});

module.exports = mongoose.model('Transaction', schema);
