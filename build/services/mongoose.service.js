"use strict";

var mongoose = require('mongoose');

var config = require('../configs/db.config');

exports.connectDb = function () {
  var url = config.mongo.uri;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(function () {
    console.log('Successfully connect to database');
  })["catch"](function (err) {
    console.log('Could not connect to database', err);
  });
};