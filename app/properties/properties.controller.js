'use strict';

let Properties = require('./properties.model.js');
let ObjectId = require('mongoose').Types.ObjectId;
let publicFields = '-__v';
let helpers = require('../helpers.js');
let paginate = helpers.paginate;
let filterFields = helpers.filterFields(publicFields);

let PropertiesController = {
  list,
  single,
  create,
  update,
  remove,
};

module.exports = PropertiesController;

function list(req, res) {
  /**
    * @api {GET} /properties/ list
    * @apiDescription Get list of properties in Spotippos
    * @apiName list
    * @apiGroup Properties
    * @apiPermission Public
    *
    * @apiParam {QueryString='x,y,title,price,description,beds,baths,squareMeters'} fields used to filter params in response
    *
    * @apiSuccess (200, 204) {String} x coordinate x from property
    * @apiSuccess (200, 204) {String} y coordinate y from property
    * @apiSuccess (200, 204) {String} title short description about property
    * @apiSuccess (200, 204) {String} price total value to revenue of property
    * @apiSuccess (200, 204) {String} description long description about property
    * @apiSuccess (200, 204) {Number} beds total of rooms in property
    * @apiSuccess (200, 204) {Number} baths total of baths in property
    * @apiSuccess (200, 204) {String} squareMeters total area of property
    *
    */

  Properties
    .find({}, filterFields(req.query), paginate(req.query))
    .then(response);

  function response(properties) {
    let status = properties.length
      ? 200
      : 204;

    res
      .status(status)
      .json(properties);
  }
};

function single(req, res) {
  /**
    * @api {GET} /properties/:id single
    * @apiDescription Get a single property by id
    * @apiName single
    * @apiGroup Properties
    * @apiPermission Public
    *
    * @apiParam {QueryString='x,y,title,price,description,beds,baths,squareMeters'} fields used to filter params in response
    *
    * @apiSuccess (200, 204) {String} x coordinate x from property
    * @apiSuccess (200, 204) {String} y coordinate y from property
    * @apiSuccess (200, 204) {String} title short description about property
    * @apiSuccess (200, 204) {String} price total value to revenue of property
    * @apiSuccess (200, 204) {String} description long description about property
    * @apiSuccess (200, 204) {Number} beds total of rooms in property
    * @apiSuccess (200, 204) {Number} baths total of baths in property
    * @apiSuccess (200, 204) {String} squareMeters total area of property
    *
    */

  let _id = new ObjectId(req.params.id);

  Properties
    .findOne({_id}, filterFields(req.query))
    .then(response);

  function response(property) {
    let status = property
      ? 200
      : 204;

    res
      .status(status)
      .json(property);
  }
};

function create(req, res) {
  /**
    * @api {POST} /properties create
    * @apiDescription Create a new property in Spotippos
    * @apiName create
    * @apiGroup Properties
    * @apiPermission Public
    *
    * @apiParam {Number} x coodinate x of property
    * @apiParam {Number} y coordinate y of property
    * @apiParam {String} title a title/name of property, to short description
    * @apiParam {Number} price value of property
    * @apiParam {String} description a long description about property
    * @apiParam {Number{1..5}} beds number of rooms in property
    * @apiParam {Number{1..4}} baths number of baths in property
    * @apiParam {Number{20..240}} squareMeters total area of property
    *
    * @apiSuccess (201) {String} id id of property, to future requests
    *
    * @apiError (400) BadRequest Return a list of invalid fields, and details about error
    *
    * @apiErrorExample {json} Error-Response:
    *     HTTP/1.1 400 Bad Request
    *     {
    *       x: {
    *         message: 'Path `x` is required.',
    *         name: 'ValidatiorError',
    *         path: 'x',
    *       },
    *       beds: {
    *         message: 'Path `beds` (10) is more than maximum allowed value (5).',
    *         kind: 'max',
    *         path: 'beds',
    *         value: 10
    *       }
    *     }
    *
    */

  let property = new Properties(req.body);

  property
    .save()
    .then(response)
    .catch(badRequest);

  function response(property) {
    let id = property._id;

    res
      .status(201)
      .json({id});
  }

  function badRequest(err) {
    res
      .status(400)
      .json(err.errors);
  }
};

function update(req, res) {
  /**
    * @api {PUT} /properties/:id update
    * @apiDescription Update data from a single property
    * @apiName update
    * @apiGroup Properties
    * @apiPermission Public
    */

  let _id = new ObjectId(req.params.id);

  Properties
    .findOne({_id})
    .then(updateKeys)
    .then(save)
    .then(response);
    // .catch(badRequest);

  function updateKeys(user) {
    for (let key in req.body) {
      user[key] = req.body[key];
    }

    return user;
  }

  function save(user) {
    return user.save();
  }

  function response() {
    res
      .status(204)
      .json();
  }

  // function badRequest(err) {
  //   res
  //     .status(400)
  //     .json(err.errors);
  // }
};

function remove(req, res) {
  /**
    * @api {DELETE} /properties/:id delete
    * @apiDescription Delete a property
    * @apiName delete
    * @apiGroup Properties
    * @apiPermission Public
    */

  Properties
    .findByIdAndRemove(req.params.id)
    .then(response);
    // .catch(notFound);

  function response() {
    res
      .status(204)
      .json();
  }
};
