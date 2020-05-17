module.exports = {
  port: 3232,
  mongodb: {
    uri: 'mongodb://localhost:27017/golfix',
    options: {
      useNewUrlParser: true,
    },
  },
  webOrigin: 'http://localhost:3232',
  static: 'dist',
}