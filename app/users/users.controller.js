'use strict';

let Users = require('./users.model.js');
let ObjectId = require('mongoose').Types.ObjectId;
let publicFields = '-__v -password';

let UsersController = {
  list,
  single,
  create,
  update,
  remove,
};

module.exports = UsersController;

function list(req, res) {
  /**
    * @api {GET} /users/ list
    * @apiDescription Get list of users
    * @apiName list
    * @apiGroup Users
    * @apiPermission Authenticated
    */

  Users
    .find({}, publicFields)
    .then(response);

  function response(users) {
    let status = users.length
      ? 200
      : 204;

    res
      .status(status)
      .json(users);
  }
};

function single(req, res) {
  /**
    * @api {GET} /users/:id single
    * @apiDescription Get an user
    * @apiName single
    * @apiGroup Users
    * @apiPermission Authenticated
    */

  let _id = new ObjectId(req.params.id);

  Users
    .findOne({_id}, publicFields)
    .then(response);

  function response(user) {
    let status = user
      ? 200
      : 204;

    res
      .status(status)
      .json(user);
  }
};

function create(req, res) {
  /**
    * @api {POST} /users create
    * @apiDescription Create a new user
    * @apiName create
    * @apiGroup Users
    * @apiPermission Authenticated
    *
    * @apiParam {String} email email of user
    * @apiParam {String} password password of user
    */

  let user = new Users(req.body);

  user
    .save()
    .then(response)
    .catch(badRequest);

  function response(user) {
    let id = user._id;

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
    * @api {PUT} /users/:id update
    * @apiDescription Update a user
    * @apiName update
    * @apiGroup Users
    * @apiPermission Authenticated
    */

  let _id = new ObjectId(req.params.id);

  Users
    .findOne({_id})
    .then(updateKeys)
    .then(save)
    .then(response);

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
};

function remove(req, res) {
  /**
    * @api {DELETE} /users/:id delete
    * @apiDescription Delete a user
    * @apiName delete
    * @apiGroup Users
    * @apiPermission Authenticated
    */

  Users
    .findByIdAndRemove(req.params.id)
    .then(response);

  function response() {
    res
      .status(204)
      .json();
  }
};
