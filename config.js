'use strict';

let config = {
  development: {
    server: {
      port: 3000,
      proxy: 5000,
    },
    database: {
      url: 'mongodb://localhost/spotippos-api',
    },
    secret: 'b9q2lr7rqyiltyb9',
    token: {
      expiresIn: 1440, // 24 hours
    },
  },
  production: {
    server: {
      port: 3000,
      proxy: 5000,
    },
    database: {
      url: 'mongodb://localhost/spotippos-api',
    },
    secret: 'b9q2lr7rqyiltyb9',
    token: {
      expiresIn: 1440, // 24 hours
    },
  },
  test: {
    server: {
      port: 3005,
      proxy: 5005,
    },
    database: {
      url: 'mongodb://localhost/spotippos-api',
    },
    secret: 'b9q2lr7rqyiltyb9',
    token: {
      expiresIn: 1440, // 24 hours
    },
  },
};

let shell = require('shell-arguments');
let env = shell.env || process.env.NODE_ENV || 'production';

module.exports = config[env];
