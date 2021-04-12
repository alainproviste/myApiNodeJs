const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/products', product.create);
router.get('/products', product.getAll);
router.get('/products/:id', product.getOne);
router.delete('/products/:id', verifyAdmin, product.delete);
router.put('/products/:id', verifyAdmin, product.update);

module.exports = router;
