const withPWA = require('next-pwa')
module.exports = withPWA({
  baseDir: '/src/app',
  pwa: {
    dest: '/../static',
  },
})
