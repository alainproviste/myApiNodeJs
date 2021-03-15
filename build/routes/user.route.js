"use strict";

var express = require('express');

var router = express.Router();

var user = require('../controllers/users.controller');

var verifyToken = require('../middlewares/verifyToken');

var userSchemaValidation = require('../middlewares/validators/users.validator');

router.post('/users', userSchemaValidation, user.create);
router.get('/users/:id', verifyToken, user.findOne);
router.post('/login', user.login);
module.exports = router;