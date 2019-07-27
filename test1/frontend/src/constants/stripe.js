const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_LIxDeAB0vJeRt0ORZ80Vo3U700U1cxqxM6'
  : 'pk_test_LIxDeAB0vJeRt0ORZ80Vo3U700U1cxqxM6';

export default STRIPE_PUBLISHABLE;
