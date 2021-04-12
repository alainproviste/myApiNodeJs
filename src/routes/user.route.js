const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const userSchemaValidation = require('../middlewares/validators/users.validator');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/users', userSchemaValidation ,user.create);
router.get('/users/:id', verifyToken, user.findOne);
router.post('/login', user.login);
router.put('/users/:id', verifyToken, user.update);
router.delete('/users/:id',verifyAdmin, user.delete);
router.get('/users', verifyAdmin, user.findAll);

module.exports = router;