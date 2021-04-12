"use strict";

var express = require('express');

var router = express.Router();

var order = require('../controllers/orders.controller');

var verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/orders', order.create);
router.get('/orders', verifyAdmin, order.getAll);
router.get('/orders/:id', order.getOne);
router.put('/orders/:id', verifyAdmin, order.updateOne);
module.exports = router;