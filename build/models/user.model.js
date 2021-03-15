"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  lastName: {
    type: String,
    required: true,
    lowercase: true
  },
  firstName: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  address: {
    type: Object,
    zip: {
      type: Number,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
});
module.exports = mongoose.model('User', userSchema);