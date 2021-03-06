const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const productRouter = require('./product.route');
const orderRouter = require('./order.route');
const checkoutRouter = require('./checkout.route');

router.use(checkoutRouter);
router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);

module.exports = router;