module.exports = {
  port: 11111,
  mongodb: {
    uri: 'mongodb://localhost:27017/golfix',
    options: {
      useNewUrlParser: true,
    },
  },
  webOrigin: 'http://localhost:11111',
  nextDir: './src/app',
  log4js: {
    appenders: {
      out: { type: 'console' },
    },
    categories: {
      default: { appenders: [ 'out' ], level: 'info' },
    },
    replaceConsole: true,
  },
  static: '../../../../src/static',
  sitemap: {
    path: '/tmp',
  },
}