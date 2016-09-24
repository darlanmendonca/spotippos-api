'use strict';

let crypto = require('crypto');

module.exports = EncodeHelper;

function EncodeHelper (str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
};
