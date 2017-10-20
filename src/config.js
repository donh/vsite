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
    title: 'IDHub',
    description: 'One identity, one world.',
    head: {
      titleTemplate: 'IDHub: %s',
      meta: [
        { name: 'description', content: 'One identity, one world.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'IDHub demo site' },
        { property: 'og:image', content: 'https://raw.githubusercontent.com/donh/vsite/master/static/logo.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'IDHub' },
        { property: 'og:description', content: 'One identity, one world.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@donh' },
        { property: 'og:creator', content: 'Don Hsieh' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },
}, environment);
