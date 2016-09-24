'use strict';

let Properties = require('./properties.model.js');
let ObjectId = require('mongoose').Types.ObjectId;
let publicFields = '-__v';

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
    */

  Properties
    .find({}, publicFields)
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
    */

  let _id = new ObjectId(req.params.id);

  Properties
    .findOne({_id}, publicFields)
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
