import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';
import { ToastContainer, toast } from 'react-toastify';
const CURRENCY = 'USD';

const fromEuroToCent = amount => amount * 100;

const successPayment = () => (toast.success("Congrats! payment has been done, please Login to continue !", {
  position: toast.POSITION.TOP_CENTER
}));

const errorPayment = () => (toast.error("Sorry! Make sure your website is on https", {
  position: toast.POSITION.TOP_CENTER
}));
const onToken = (amount, description) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;