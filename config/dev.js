const { resolve } = require('path')

module.exports = {
  server: {
    firebase: {
      credentials: resolve(process.cwd(), 'config', 'credentials.json'),
      databaseURL: 'https://where-should-we-live.firebaseio.com',
    },
  },
}
