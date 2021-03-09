"use strict";

var Joi = require('joi');

var userSchemaValidation = function userSchemaValidation(req, res, next) {
  var userValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')).required()
  });
  var validation = userValidationSchema.validate(req.body); // console.log(validation);

  if (validation.error) {
    return res.send({
      error: validation.error
    });
  }

  next();
};

module.exports = userSchemaValidation;