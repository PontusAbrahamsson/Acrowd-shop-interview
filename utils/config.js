const WoocommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

export const api = new WoocommerceRestApi({
  baseUrl: process.env.BASE_URL,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  version: 'wc/v3'
});