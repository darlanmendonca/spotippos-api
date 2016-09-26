'use strict';

let faker = require('faker');
let config = require('../config');

module.exports = {
  API: `http://localhost:${config.server.port}/api`,

  user: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.past(),
    gender: 'male',
  },

  property: {
    x: 222,
    y: 444,
    title: 'Imóvel código 1, com 5 quartos e 4 banheiros',
    price: 1250000,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    beds: 4,
    baths: 3,
    squareMeters: 210,
  },

  newProperty: {
    x: 200,
    y: 780,
    title: 'Imóvel código 2, com 2 quartos e 1 banheiro',
    price: 900000,
    description: 'Lorem ipsum dolor sit amet',
    beds: 2,
    baths: 1,
    squareMeters: 120,
  },
};
