require("regenerator-runtime/runtime");
const stripe = require('stripe')('sk_test_51IYBRTFexOrILhH4CnkQDQDeyN2JerKe6mfS3yGjNAHerXbY8OO3RCcfEqNPl74wVpFHRJ7u2BkDDeHBfl5gdUoE007XUxAYZy')

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Order',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:8080/success',
    cancel_url: 'http://localhost:8080/cancel',
  });

  res.json({ id: session.id });
};