"use strict";

var Product = require('../models/product.model');

exports.create = function (req, res) {
  var product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img
  });
  product.save().then(function (data) {
    res.send({
      product: data,
      created: true
    });
  })["catch"](function (err) {
    console.log(err.message);
    res.status(500).send({
      error: 500,
      message: err.message || "some error occured while creating product"
    });
  });
};

exports.getAll = function (req, res) {
  Product.find().then(function (data) {
    res.status(200).json(data);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.getOne = function (req, res) {
  var id = req.params.id;
  Product.findById(id).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    console.log(err.message);
    res.send(err);
  });
};