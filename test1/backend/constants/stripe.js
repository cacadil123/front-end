const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_RNd84fI5QPEUv5FkFQ7EusWE00vFrvJGj2'
    : 'sk_test_RNd84fI5QPEUv5FkFQ7EusWE00vFrvJGj2';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
