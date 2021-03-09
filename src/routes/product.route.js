const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');

router.post('/products', product.create);
router.get('/products', product.getAll);
router.get('/product/:id', product.getOne);

module.exports = router;
