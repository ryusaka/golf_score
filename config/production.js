module.exports = {
  port: 3232,
  mongodb: {
    uri: 'mongodb://localhost:27017/golfix',
    options: {
      useNewUrlParser: true,
    },
  },
  webOrigin: 'https://golfix.herokuapp.com',
  static: 'dist',
}