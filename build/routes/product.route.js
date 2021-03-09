"use strict";

var express = require('express');

var router = express.Router();

var product = require('../controllers/products.controller');

router.post('/products', product.create);
router.get('/products', product.getAll);
router.get('/product/:id', product.getOne);
module.exports = router;