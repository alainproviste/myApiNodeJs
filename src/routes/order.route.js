const express = require('express');
const router = express.Router();
const order = require('../controllers/orders.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/orders', order.create);
router.get('/orders', verifyAdmin,  order.getAll);
router.get('/orders/:id', order.getOne);
router.put('/orders/:id', verifyAdmin, order.updateOne);

module.exports = router;