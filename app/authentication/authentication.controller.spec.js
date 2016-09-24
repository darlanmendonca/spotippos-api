'use strict';

let helper = require('../../test/helper.js');
let app = require('../index.js');

let chai = require('chai');
chai.use(require('chai-http'));
let request = chai.request;
let expect = chai.expect;

describe('Authentication', function() {
  describe('.local - POST /api/authentication', function() {
    it('authentication failed', function(done) {
      request(app)
        .post('/api/authentication')
        .set('token', helper.user.token)
        .field('email', helper.user.email)
        .field('password', helper.user.invalidPassword)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'authentication failed');
          done();
        });
    });

    it('authentication success', function(done) {
      request(app)
        .post('/api/authentication')
        .set('token', helper.user.token)
        .field('email', helper.user.email)
        .field('password', helper.user.password)
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('id', helper.user._id.toString());
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
});
