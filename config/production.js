module.exports = {
  port: 3232,
  mongodb: {
    // uri: `mongodb+srv://ryusaka:${process.env.MONGO_PASS}@cluster0-0sg1r.gcp.mongodb.net/test?retryWrites=true&w=majority`,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  webOrigin: 'http://localhost:3232',
}
