"use strict";

var express = require('express');

var router = express.Router();

var order = require('../controllers/orders.controller');

router.post('/orders', order.create);
router.get('/orders', order.getAll);
module.exports = router;