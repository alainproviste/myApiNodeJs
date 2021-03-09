"use strict";

var app = require('./services/express.service');

var mongoose = require('./services/mongoose.service');

mongoose.connectDb();
app.start();