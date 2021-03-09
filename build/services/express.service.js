"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var apiRouter = require('../routes');

var bodyParser = require('body-parser');

var cors = require('cors');

exports.start = function () {
  var port = 3000;
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api/v1', apiRouter);
  app.listen(port, function (err) {
    if (err) {
      console.log("Error : ".concat(err));
      process.exit();
    }

    console.log("app is running on port ".concat(port));
  });
};