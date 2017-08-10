require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || '0.0.0.0',
  apiPort: process.env.APIPORT,
  app: {
    title: 'vChain',
    description: 'The hottest blockchain on the earth.',
    head: {
      titleTemplate: 'vChain: %s',
      meta: [
        { name: 'description', content: 'The hottest blockchain on the earth.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'vChain demo site' },
        { property: 'og:image', content: 'https://raw.githubusercontent.com/donh/vsite/master/static/logo.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'vChain' },
        { property: 'og:description', content: 'The hottest blockchain on the earth.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@donh' },
        { property: 'og:creator', content: 'Don Hsieh' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },
}, environment);
