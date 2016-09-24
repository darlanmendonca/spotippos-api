'use strict';

let mongoose = require('mongoose');
let encode = require('../encode/encode.helper.js');

let schema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true, set: encode},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('users', schema);
