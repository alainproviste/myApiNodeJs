"use strict";

var Order = require('../models/order.model');

var User = require('../models/user.model');

exports.create = function (req, res) {
  var order = new Order({
    total: req.body.total,
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