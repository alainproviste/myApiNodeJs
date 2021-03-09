"use strict";

var express = require('express');

var router = express.Router();

var userRouter = require('./user.route');

var productRouter = require('./product.route');

var orderRouter = require('./order.route');

router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);
module.exports = router;