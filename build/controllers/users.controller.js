"use strict";

var User = require('../models/user.model');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var Joi = require('joi');

exports.create = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 10);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: false,
    address: req.body.address
  });
  user.save().then(function (data) {
    var userToken = jwt.sign({
      id: data._id
    }, 'supersecret', {
      expiresIn: 86400
    });
    res.send({
      token: userToken,
      auth: true
    });
  })["catch"](function (err) {
    res.status(500).send({
      error: 500,
      message: err.message || 'some error occured while creating user'
    });
  });
};

exports.findOne = function (req, res) {
  User.findById(req.params.id).populate('orders').then(function (data) {
    if (!data) {
      res.status(404).send({
        message: "User with id ".concat(req.params.id, " not found") // message:"User with id" + req.params.id +"not found"

      });
    }

    res.send(data);
  })["catch"](function (err) {
    return res.send(err);
  });
};

exports.login = function (req, res) {
  User.findOne({
    email: req.body.email
  }).then(function (data) {
    if (!data) {
      return res.status(404).send({
        auth: false,
        token: null,
        message: "No user find with email ".concat(req.body.email)
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: 'password is not valid'
      });
    }

    var userToken = jwt.sign({
      id: data._id
    }, 'supersecret', {
      expiresIn: 86400
    });
    res.send({
      auth: true,
      token: userToken
    });
  })["catch"](function (err) {
    res.send(err);
  });
};