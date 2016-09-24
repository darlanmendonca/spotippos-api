'use strict';

let helper = require('../../test/helper.js');
let app = require('../index.js');
let faker = require('faker');

let chai = require('chai');
chai.use(require('chai-http'));
let request = chai.request;
let expect = chai.expect;

describe('Properties', function() {
  describe('.list - GET /properties', function() {
    it('no token provided', function(done) {
      request(app)
        .get('/properties')
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.instanceOf(Array);
          done();
        });
    });

    it('list properties', function(done) {
      request(app)
        .get('/properties')
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          console.log(res.body);
          expect(res.body).to.be.instanceOf(Array);
          done();
        });
    });
  });

  describe('.create - POST /properties', function() {
    xit('no token provided', function(done) {
      request(app)
        .post('/properties')
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'no token provided');
          done();
        });
    });

    xit('invalid token', function(done) {
      request(app)
        .post('/properties')
        .field('token', helper.property.invalidToken)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'invalid token');
          done();
        });
    });

    xit('invalid fields', function(done) {
      request(app)
        .post('/properties')
        .set('token', helper.property.token)
        .field('test', 'true')
        .then(function(res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('password');
          expect(res.body).to.have.property('email');
          done();
        });
    });

    xit('create an user', function(done) {
      request(app)
        .post('/properties')
        .set('token', helper.property.token)
        .field('test', 'true')
        .field('email', faker.internet.email())
        .field('password', faker.internet.password())
        .then(function(res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  describe('.single - GET /properties/:id', function() {
    xit('no token provided', function(done) {
      request(app)
        .get(`/properties/${helper.property._id}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'no token provided');
          done();
        });
    });

    xit('invalid token', function(done) {
      request(app)
        .get(`/properties/${helper.property._id}?token=${helper.property.invalidToken}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'invalid token');
          done();
        });
    });

    xit('not found', function(done) {
      request(app)
        .get(`/properties/${helper.property._id.toString().replace(/^.{2}/, 'dd')}`)
        .set('token', helper.property.token)
        .then(function(res) {
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.deep.equal({});
          done();
        });
    });

    xit('invalid id', function(done) {
      request(app)
        .get('/properties/:id'.replace(':id', '123'))
        .set('token', helper.property.token)
        .then(function(res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message', 'invalid id');
          done();
        });
    });

    xit('get an user', function(done) {
      request(app)
        .get(`/properties/${helper.property._id.toString()}`)
        .set('token', helper.property.token)
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('_id', helper.property._id.toString());
          expect(res.body).to.have.property('email', helper.property.email);
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.not.have.property('password');
          expect(res.body).to.not.have.property('__v');
          done();
        });
    });
  });

  describe('.update - PUT /properties/:id', function() {
    xit('no token provided', function(done) {
      request(app)
        .put(`/properties/${helper.property._id}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'no token provided');
          done();
        });
    });

    xit('invalid token', function(done) {
      request(app)
        .put(`/properties/${helper.property._id}`)
        .field('token', helper.property.invalidToken)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'invalid token');
          done();
        });
    });

    xit('update an user', function(done) {
      request(app)
        .put(`/properties/${helper.property._id}`)
        .set('token', helper.property.token)
        .field('email', 'darlanmendonca@gmail.com')
        .then(function(res) {
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
    });
  });

  describe('.delete - DELETE /properties/:id', function() {
    xit('no token provided', function(done) {
      request(app)
        .delete(`/properties/${helper.property._id}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'no token provided');
          done();
        });
    });

    xit('invalid token', function(done) {
      request(app)
        .delete(`/properties/${helper.property._id}`)
        .field('token', helper.property.invalidToken)
        .then(function(res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'invalid token');
          done();
        });
    });

    xit('delete an user', function(done) {
      request(app)
        .delete(`/properties/${helper.property._id}`)
        .set('token', helper.property.token)
        .then(function(res) {
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});
