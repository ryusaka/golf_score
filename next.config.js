// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
module.exports = withPWA({
  baseDir: '/src/app',
  pwa: {
    dest: '/../static',
  },
})
