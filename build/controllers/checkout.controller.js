"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("regenerator-runtime/runtime");

var stripe = require('stripe')('sk_test_51IYBRTFexOrILhH4CnkQDQDeyN2JerKe6mfS3yGjNAHerXbY8OO3RCcfEqNPl74wVpFHRJ7u2BkDDeHBfl5gdUoE007XUxAYZy');

exports.checkout = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var session;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [{
                price_data: {
                  currency: 'eur',
                  product_data: {
                    name: 'Order'
                  },
                  unit_amount: req.body.amount
                },
                quantity: 1
              }],
              mode: 'payment',
              success_url: 'http://localhost:8080/success',
              cancel_url: 'http://localhost:8080/cancel'
            });

          case 2:
            session = _context.sent;
            res.json({
              id: session.id
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();