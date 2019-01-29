module.exports = {
  port: 11111,
  mongodb: {
    uri: 'mongodb://localhost:27018/golfix',
    options: {
      useNewUrlParser: true,
    },
  },
  webOrigin: 'http://localhost:11000',
  log4js: {
    appenders: {
      out: { type: 'console' },
    },
    categories: {
      default: { appenders: [ 'out' ], level: 'info' },
    },
    replaceConsole: true,
  },
  static: 'src/static',
  sitemap: {
    path: '/tmp',
  },
}