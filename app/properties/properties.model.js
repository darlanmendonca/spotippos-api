'use strict';

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  title: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
  description: {type: String, required: true, unique: true},
  beds: {type: Number, required: true, max: 5, min: 1},
  baths: {type: Number, required: true, max: 4, min: 1},
  squareMeters: {type: Number, required: true, max: 240, min: 20},

  createdAt: {type: Date, default: Date.now},
});

schema.index({x: 1, y: 1}, {unique: true});

module.exports = mongoose.model('properties', schema);
