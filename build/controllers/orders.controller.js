"use strict";

var Order = require('../models/order.model');

var User = require('../models/user.model');

exports.create = function (req, res) {
  var order = new Order({
    total: req.body.total,
    date: req.body.date,
    status: req.body.status,
    user: req.body.user,
    products: req.body.products
  });
  order.save().then(function (data) {
    User.findByIdAndUpdate(req.body.user, {
      orders: data._id
    }).then(function () {
      res.send({
        data: data
      })["catch"](function (err) {
        return res.send(err);
      });
    });
    res.send({
      order: data
    });
  })["catch"](function (err) {
    console.log(err.message);
    res.status(500).send({
      error: 500,
      message: err.message || "some error occured while creating order"
    });
  });
};

exports.getAll = function (req, res) {
  Order.find({}).populate('productss').populate('user').then(function (data) {
    res.send({
      order: data,
      created: true
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.getOne = function (req, res) {
  var id = req.params.id;
  Order.findById(id).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    console.log(err.message);
    res.send(err);
  });
};

exports.updateOne = function (req, res) {
  var order = Order.findById(req.params.id);
  Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  }).then(function (data) {
    order;
    res.send({
      order: data
    });
  })["catch"](function (err) {
    res.status(500).send({
      error: 500,
      message: err.message || "NULL"
    });
  });
};