"use strict";

var express = require('express');

var router = express.Router();

var checkout = require('../controllers/checkout.controller');

router.post('/create-checkout-session', checkout.checkout);
module.exports = router;