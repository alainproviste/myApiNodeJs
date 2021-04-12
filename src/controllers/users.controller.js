const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.create = (req, res) => {

  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
    address: req.body.address
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
        },
        'supersecret',
        {
          expiresIn: 86400,
        }
      );
      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || 'some error occured while creating user',
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .populate('orders')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
          // message:"User with id" + req.params.id +"not found"
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.update = (req, res) => {
  var user = User.findById(req.params.id)
  User.findByIdAndUpdate(
      req.params.id,
      {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          address: req.body.address
      }
  )
  .then(() => {
    user
        .then((data) => {
            res.send({
                user: data,
                update: true,
            })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
})
.catch((err) => {
    res.status(500).send({
        error: 500,
        message: err.message || "NULL"
    })
})
}

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
      .then((data) => {
        
      if (!data) {
        return res.status(404).send({
          auth: false,
          token: null,
          message: `No user find with email ${req.body.email}`,
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          token: null,
          message: 'password is not valid',
        });
      }

      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin
        },
        'supersecret',
        {expiresIn: 86400}
      );

      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
      .then(() => {
          res.send({
              delete: true
          })
      })
      .catch((err) => {
          console.log(err.message);
          res.status(500).send({
              error: 500,
              message: err.message || "NULL"
          })
      })

}

exports.findAll = (req, res) => {
  User.find()
    .populate('orders')
    .then((data) => {
        res.send({
            users: data,
            response: true
        })
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({
            error: 500,
            message: err.message || "NULL"
        })
    })
}