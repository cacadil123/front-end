const stripe = require('../constants/stripe');
const axios = require('axios');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    const {amount,balance_transaction,description,receipt_url} = stripeRes;
    axios({
      method: 'post',
      url: 'http://18.220.236.209/api/users/payment-info',
      data: {
      amount,
      balance_transaction,
      description,
      receipt_url
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(function (response) {
     window.location.assign('/current');
    });
    res.status(200).send({ success: stripeRes });
  }
}

const paymentApi = app => {
  app.get('/', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  app.post('/', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  });
 
  return app;
};

module.exports = paymentApi;
