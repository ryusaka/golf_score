const fallback = require('express-history-api-fallback')
const path = require('path')
process.on('uncaughtException', err => {
  const message = `API Uncaught Exception: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

process.on('unhandledRejection', err => {
  const message = `API Unhandled Rejection: ${err.name || 'Unknown'}\n\n${err.message}\n${err.stack}`
  console.error(message)
})

const express = require('express')
const app = express()
const server = app.listen(process.env.PORT, () => {
  console.log('Starting server on %s', app.get('port'))
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '1mb'}))

app.use(express.static(path.join(__dirname, '../../dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})
app.use(fallback('index.html', { root: '../../dist' }))