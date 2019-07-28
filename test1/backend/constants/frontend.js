const FRONTEND_DEV_URLS = [ 'http://localhost:3001' ];

const FRONTEND_PROD_URLS = [
  'http://13.59.25.159/',
  'http://13.59.25.159/'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
