"use strict";

var express = require('express');

var router = express.Router();

var user = require('../controllers/users.controller');

var verifyToken = require('../middlewares/verifyToken');

var userSchemaValidation = require('../middlewares/validators/users.validator');

var verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/users', userSchemaValidation, user.create);
router.get('/users/:id', verifyToken, user.findOne);
router.post('/login', user.login);
router.put('/users/:id', verifyToken, user.update);
router["delete"]('/users/:id', verifyAdmin, user["delete"]);
router.get('/users', verifyAdmin, user.findAll);
module.exports = router;