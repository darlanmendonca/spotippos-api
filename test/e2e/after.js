'use strict';

let Users = require('../../app/users/users.model.js');
let Properties = require('../../app/properties/properties.model.js');

after(removeUsers);
after(removeProperties);

function removeUsers(done) {
  Users
    .remove({})
    .then(function() {
      done();
    });
}

function removeProperties(done) {
  Properties
    .remove({})
    .then(function() {
      done();
    });
}
