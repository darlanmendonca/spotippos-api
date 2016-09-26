'use strict';

let helper = require('../../test/helper.js');
let app = require('../index.js');
// let faker = require('faker');

let chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-things'));
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
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body).all.have.property('x');
          expect(res.body).all.have.property('y');
          expect(res.body).all.have.property('title');
          expect(res.body).all.have.property('price');
          expect(res.body).all.have.property('description');
          expect(res.body).all.have.property('beds');
          expect(res.body).all.have.property('baths');
          expect(res.body).all.have.property('squareMeters');
          done();
        });
    });

    it('list properties with specific fields', function(done) {
      request(app)
        .get('/properties?fields=title,description')
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body).all.have.property('title');
          expect(res.body).all.have.property('description');
          expect(res.body).all.not.have.property('x');
          expect(res.body).all.not.have.property('y');
          expect(res.body).all.not.have.property('price');
          expect(res.body).all.not.have.property('beds');
          expect(res.body).all.not.have.property('baths');
          expect(res.body).all.not.have.property('squareMeters');
          done();
        });
    });
  });

  describe('.create - POST /properties', function() {
    it('no token provided', function(done) {
      request(app)
        .post('/properties')
        .then(function(res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('x');
          expect(res.body).to.have.property('y');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('beds');
          expect(res.body).to.have.property('baths');
          expect(res.body).to.have.property('squareMeters');
          done();
        });
    });

    it('invalid fields', function(done) {
      request(app)
        .post('/properties')
        .then(function(res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('x');
          expect(res.body).to.have.property('y');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('beds');
          expect(res.body).to.have.property('baths');
          expect(res.body).to.have.property('squareMeters');
          done();
        });
    });

    xit('create a property with wrong coodirnate', function(done) {
      request(app)
        .post('/properties')
        .field('x', helper.newProperty.x)
        .field('y', helper.newProperty.y)
        .field('title', helper.newProperty.title)
        .field('price', helper.newProperty.price)
        .field('description', helper.newProperty.description)
        .field('beds', helper.newProperty.beds)
        .field('baths', helper.newProperty.baths)
        .field('squareMeters', helper.newProperty.squareMeters)
        .then(function(res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  describe('.single - GET /properties/:id', function() {
    it('no token provided', function(done) {
      request(app)
        .get(`/properties/${helper.property._id}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('_id', helper.property._id.toString());
          expect(res.body).to.have.property('x', helper.property.x);
          expect(res.body).to.have.property('y', helper.property.y);
          expect(res.body).to.have.property('title', helper.property.title);
          expect(res.body).to.have.property('price', helper.property.price);
          expect(res.body).to.have.property('description', helper.property.description);
          expect(res.body).to.have.property('beds', helper.property.beds);
          expect(res.body).to.have.property('baths', helper.property.baths);
          expect(res.body).to.have.property('squareMeters', helper.property.squareMeters);
          done();
        });
    });

    it('not found', function(done) {
      request(app)
        .get(`/properties/${helper.property._id.toString().replace(/^.{2}/, 'dd')}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.deep.equal({});
          done();
        });
    });

    it('invalid id', function(done) {
      request(app)
        .get('/properties/:id'.replace(':id', '123'))
        .then(function(res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message', 'invalid id');
          done();
        });
    });

    it('get a property', function(done) {
      request(app)
        .get(`/properties/${helper.property._id.toString()}`)
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('_id', helper.property._id.toString());
          expect(res.body).to.have.property('x', helper.property.x);
          expect(res.body).to.have.property('y', helper.property.y);
          expect(res.body).to.have.property('title', helper.property.title);
          expect(res.body).to.have.property('price', helper.property.price);
          expect(res.body).to.have.property('description', helper.property.description);
          expect(res.body).to.have.property('beds', helper.property.beds);
          expect(res.body).to.have.property('baths', helper.property.baths);
          expect(res.body).to.have.property('squareMeters', helper.property.squareMeters);
          done();
        });
    });

    it('get a property with specific fields', function(done) {
      request(app)
        .get(`/properties/${helper.property._id.toString()}?fields=title,description`)
        .then(function(res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('_id', helper.property._id.toString());
          expect(res.body).to.have.property('title', helper.property.title);
          expect(res.body).to.have.property('description', helper.property.description);
          expect(res.body).to.not.have.property('x');
          expect(res.body).to.not.have.property('y');
          expect(res.body).to.not.have.property('price');
          expect(res.body).to.not.have.property('beds');
          expect(res.body).to.not.have.property('baths');
          expect(res.body).to.not.have.property('squareMeters');
          done();
        });
    });

  });

  describe('.update - PUT /properties/:id', function() {
    it('no token provided', function(done) {
      request(app)
        .put(`/properties/${helper.property._id}`)
        .field('title', 'lorem ipsum 1')
        .then(function(res) {
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.have.property('message', 'updated');
          done();
        });
    });

    it('update an user', function(done) {
      request(app)
        .put(`/properties/${helper.property._id}`)
        .field('title', 'lorem ipsum 2')
        .then(function(res) {
          expect(res.statusCode).to.equal(204);
          expect(res.body).to.have.property('message', 'updated');
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
