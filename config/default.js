const { resolve } = require('path')

module.exports = {
  kaliber: {
    compileWithBabel: [/node_modules\/subscribe-ui-event/],
    publicPath: '/build/',
  },
  server: {
    darksky: {
      apiKey: '1e1eb6d1dfbbb8a11581a28cc5d00863', // me@joostkiens.com
      // apiKey: '1fe209411f55fe2bac6b151fc525f011', // joostkiens@gmail.com
      // apiKey: '6ac0d6418a5484ab4343cdfc5c03a0ec', // joost.kiens@gmail.com
    },
    firebase: {
      credentials: resolve(process.cwd(), 'config', 'credentials.json'),
      databaseURL: 'https://where-should-we-live.firebaseio.com',
    },
  },
  rollbar: {
    accessToken: '5961d84958c344119093a838bdc7f9ae',
  },
  thisConfigKeyShouldNotAppearInTheClient: true,
}
